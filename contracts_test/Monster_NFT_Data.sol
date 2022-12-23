// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/Strings.sol";

contract Monster_NFT_Data is ERC721Enumerable, Ownable {
    uint256 public constant MAX_TOKEN_COUNT = 60;
    uint256 public mint_price = 1 ether;

    string public metadataURI;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _metadataURI
    ) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
    }

    // token 구조체 생성
    struct TokenData {
        uint256 Rank;
        uint256 Type;
    }

    // Token의 ID(uint)를 받아 TokenData로 매핑
    mapping(uint256 => TokenData) public TokenDatas;

    // 어떤 타입의 토큰이 몇개나 발행 되었는지 확인하기 위한 상태 변수[Rank 개수][Type개수]
    uint256[4][4] public tokenCount;

    // mintToken함수를 실행하면 이더를 지급하게 만들고 CA에게 이더를 보내서 NFT를 구매하는 기능 구현
    function mintToken() public payable {
        // 구매자의 잔액이 민팅가격보다 높은지 확인
        require(msg.value > mint_price);
        // 발행량이 총 발행량보다 적은지 확인
        require(MAX_TOKEN_COUNT > ERC721Enumerable.totalSupply());

        // 총 발행량에 1을 더해서 토큰 아이디 변수에 넣어 둔다.
        uint256 tokenId = ERC721Enumerable.totalSupply() + 1;

        // tokenId에 맞춰서 Rank랑 Type을 랜덤 생성해서 TokenData로 저장
        TokenData memory random = getRandomTokenData(msg.sender, tokenId); // 랜덤 함수 생성
        // 총 발행량의 +1 더해진 토큰 아이디
        TokenDatas[tokenId] = random;

        // 랜덤으로 생성한 Rank와 Type을 가진 Token의 갯수가 몇개인지 확인 하기 위한 상태 변수
        tokenCount[TokenDatas[tokenId].Rank - 1][
            TokenDatas[tokenId].Type - 1
        ] += 1;

        // CA => 컨트랙트 배포자 계정, 여기로 지급받은 이더를 전송해 준다.
        payable(Ownable.owner()).transfer(msg.value);

        // mintToken 함수를 호출한 계정에 NFT 발행
        _mint(msg.sender, tokenId);
    }

    // TokenData를 랜덤하게 만들어줄 함수
    function getRandomTokenData(address _owner, uint256 _tokenId)
        private
        pure
        returns (TokenData memory)
    {
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(_owner, _tokenId))
        ) % 60;

        // 토큰의 데이터를 저장할 변수
        TokenData memory data;

        // 숫자 확률에 따라 등급(Rank)을 나눌 수 있도록 조건으로 범위 나눔
        // 4 + 8(12)+12(24)
        if (randomNum < 4) {
            if (randomNum == 1) {
                data.Rank = 4;
                data.Type = 4;
            } else if (randomNum == 2) {
                data.Rank = 4;
                data.Type = 3;
            } else if (randomNum == 3) {
                data.Rank = 4;
                data.Type = 2;
            } else {
                data.Rank = 4;
                data.Type = 1;
            }
        } else if (randomNum < 12) {
            if (randomNum < 6) {
                data.Rank = 3;
                data.Type = 4;
            } else if (randomNum < 8) {
                data.Rank = 3;
                data.Type = 3;
            } else if (randomNum < 10) {
                data.Rank = 3;
                data.Type = 2;
            } else {
                data.Rank = 3;
                data.Type = 1;
            }
        } else if (randomNum < 28) {
            if (randomNum < 16) {
                data.Rank = 2;
                data.Type = 4;
            } else if (randomNum < 20) {
                data.Rank = 2;
                data.Type = 3;
            } else if (randomNum < 24) {
                data.Rank = 2;
                data.Type = 2;
            } else {
                data.Rank = 2;
                data.Type = 1;
            }
        } else {
            if (randomNum < 36) {
                data.Rank = 1;
                data.Type = 4;
            } else if (randomNum < 44) {
                data.Rank = 1;
                data.Type = 3;
            } else if (randomNum < 52) {
                data.Rank = 1;
                data.Type = 2;
            } else {
                data.Rank = 1;
                data.Type = 1;
            }
        }
        return data;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        // Rank와 Type으로 json 파일의 경로를 만들어준다.
        // metadataURI : nft의 토큰 값에 매칭되는 앞부분 URI를 나타내는 상태 변수 ( = URL 앞부분에 붙는 주소같은 baseURL이라고 생각하면 된다.)
        // uint에서 바로 문자열로 형변환이 불가능하기 때문에 uint에서 bytes로 변환하고, 문자열로 형변환 해준다. ( 위에 import로 가져온 toString)
        string memory Rank = Strings.toString(TokenDatas[_tokenId].Rank);
        string memory Type = Strings.toString(TokenDatas[_tokenId].Type);

        // http://localhost:3000/metadata/1(Rank값)/3(Type값).json 이런 형태로 만들어준다.
        return string(abi.encodePacked(metadataURI, "/", Rank, Type, ".json"));
    }

    // 만약 metadataURI의 수정이 필요한 경우 사용할 함수
    // 컨트랙트 배포한 사람이 호출할 수 있도록 함수를 만들어야 함.
    // onlyOwner : 컨트랙트 배포자만 호출할 수 있는 함수이다.
    function setMetadataURI(string memory _uri) public onlyOwner {
        metadataURI = _uri;
    }

    // TokenData의 Rank를 조회하는 함수
    function getTokenRank(uint256 _tokenId) public view returns (uint256) {
        return TokenDatas[_tokenId].Rank;
    }

    // TokenData의 Type를 조회하는 함수
    function getTokenType(uint256 _tokenId) public view returns (uint256) {
        return TokenDatas[_tokenId].Type;
    }

    // 배열 전체 내용을 조회하는 함수
    // 솔리디티에서 요소를 하나만 return하기 때문에 배열을 getter로 전체 조회하는것은 불가능하다.
    // 배열 전체를 return 해주는 view 함수를 만들어 준다.
    function getTokenCount() public view returns (uint256[4][4] memory) {
        return tokenCount;
    }
}
