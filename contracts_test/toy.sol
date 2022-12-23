// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Strings.sol";

contract NFTtoken2 is ERC721Enumerable, Ownable {
    // 누가 어떤 NFT를 뽑았나 이벤트
    event nftTokenList(address nftTokenAddress, uint256 nftTokenNum);
    // NFT토큰의 최대량
    uint256 public constant MAX_TOKEN_COUNT = 60;
    // mint할때마다 가격 기준
    uint256 public mint_price = 1 wei;
    // meta URI
    string public metadataURI;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadataURI
    ) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
    }

    struct userRandomGetNFT {
        uint256[] userNFTTokenIndex;
        bool randomSecond;
    }
    // 구조체에 값을 넣으려면 구조체에 맞는 그릇을 하나 준비하는게 좋다.
    userRandomGetNFT userNFT;
    // 1~60까지 배열 동적 변수
    mapping(address => userRandomGetNFT) userRandomNFTs;

    // 민트하는 함수
    function mintToken() public payable {
        require(
            msg.value > mint_price,
            "Your minting value is less than our minting standard"
        );
        require(
            MAX_TOKEN_COUNT > totalSupply(),
            "You've exceeded the value that you can mint per day"
        );

        uint256 tokenId = totalSupply() + 1;
        uint256 randomnum = getRandomTokenData(msg.sender, tokenId, userNFT);
        emit nftTokenList(msg.sender, randomnum);
        payable(Ownable.owner()).transfer(msg.value);
        _mint(msg.sender, randomnum);
    }

    function getRandomTokenData(
        address _owner,
        uint256 _tokenId,
        userRandomGetNFT storage _userNFT
    ) private returns (uint256) {
        // 임의의 랜덤값을 구한다
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(_owner, _tokenId))
        ) % 100;
        // 만약 처음인 유저라면 배열에 60개를 넣어준다
        // 하지만 기본 배열 구조체에 구조체 배열에 접근하려면 그에 맞는 그릇을 먼저 가져와야한다
        // 미리 선언된 userRandomGetNFT타입인 구조체를 매개변수로 던져줘야 pop이든 push든 임시로 구문을 작성해놓는다
        // 그 이후에 내가 push나 pop을 사용할 구조체 배열 구조체에 매핑으로 할당해야 하는것이다.
        if (userRandomNFTs[msg.sender].randomSecond == false) {
            for (uint256 i = 0; i < 60; i++) {
                _userNFT.userNFTTokenIndex[
                    _userNFT.userNFTTokenIndex.length
                ] = i;
            }
        } else {
            // 토큰의 데이터를 저장할 변수
            // 어차피 여기는 뽑기 구문이기에 length - 1로 미리 자리를 빼놓는다
            for (
                uint256 i = 0;
                i < _userNFT.userNFTTokenIndex.length - 1;
                i++
            ) {
                if (randomNum == i) {
                    _userNFT.userNFTTokenIndex[i] = _userNFT.userNFTTokenIndex[
                        i + 1
                    ];
                }
                _userNFT.userNFTTokenIndex.pop();
            }
        }
        _userNFT.randomSecond = true;
        userRandomNFTs[msg.sender] = _userNFT;
        return randomNum;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        string memory _tokenIdString = string(Strings.toString(_tokenId));
        return
            string(abi.encodePacked(metadataURI, "/", _tokenIdString, ".json"));
    }

    function setMetadataURI(string memory _uri) public {
        metadataURI = _uri;
    }

    // function getTokenCount() public view returns (uint256[] memory) {
    //     return tokenCount;
    // }
}
