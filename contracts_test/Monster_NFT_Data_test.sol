// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.17;

// import "openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "openzeppelin-solidity/contracts/access/Ownable.sol";
// import "openzeppelin-solidity/contracts/utils/Strings.sol";

// contract Monster_NFT_Data is ERC721Enumerable, Ownable{
//    // NFT토큰 발행 최대값
//    uint public constant MAX_TOKEN_COUNT = 60;
//    // NFT민팅 가격
//    uint public Mint_Price = 0.01 ether;

//    string public metadataURI;

//    constructor(
//     string memory _name,
//     string memory _symbol,
//     string memory _metadataURI
//    )ERC721(_name, _symbol){
//     metadataURI = _metadataURI;
//    }

//    struct TokenData{
//     uint NFT_Number;
//    }

//     // 토큰ID 받아서 해당 토큰의 보유 번호 매핑
//     mapping (uint => TokenData) public TokenDatas;

//     // 민팅 함수
//     function mintToken() public payable{
//         // 구매자가 민팅할수있는 금액을 보유하고있는지 확인
//         require(msg.value > Mint_Price);
//         // 발행량이 총 갯수보다 작은지 확인
//         require(MAX_TOKEN_COUNT > ERC721Enumerable.totalSupply());

//         uint tokenId = ERC721Enumerable.totalSupply();

//         TokenData memory 
//     }

// }
