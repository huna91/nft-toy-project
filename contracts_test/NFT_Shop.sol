// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./Monster_NFT_Data.sol";

contract NFT_Shop {
    // Token은 상태변수 이며, NFT_Token과 상호작용하기 위해 만든 상태 변수이다.
    Monster_NFT_Data public Token;

    // 배포 단계에서 상호작용 하기 위해 배포한 NFT_Token의 CA를 매개변수로 받아서 전달해 준다.
    constructor(address _tokenAddress) {
        Token = Monster_NFT_Data(_tokenAddress);
    }

    // Token.getTokenRank(1)  이런식으로 상호작용 하면 된다.

    // Token info 구조체
    struct TokenInfo {
        uint256 tokenId;
        uint256 Rank;
        uint256 Type;
        uint256 price;
    }

    // token의 아이디 => price(토큰의 가격)
    mapping(uint256 => uint256) public tokenPrices;

    // 판매중인 NFT의 토큰 아이디 값을 담아놓은 상태변수
    uint256[] public SellTokenList;

    // 판매 등록 함수
    function SellsToken(uint256 _tokenId, uint256 _price) public {
        // 토큰의 소유자들의 계정을 가져온다.
        address tokenOwner = Token.ownerOf(_tokenId);

        // 토큰의 소유자를 가져왔을 때 등록한 사람이 소유자가 맞다면 판매 가능하도록 조건
        require(tokenOwner == msg.sender);

        // 판매 가격이 0보다 큰 값인지 확인
        require(_price > 0);

        // isApprovedForAll ( 매개변수(첫번째 = 판매자, 두번째 = 현재 컨트랙트) )
        // : 두번쨰 매개변수로 입력한 컨트랙트 함수를 실행한 사람이 모든 토큰의 권한을 위임했는지 컨트랙트 CA에 체크해준다.
        // this는 SellToken 컨트랙트를 의미한다.
        require(Token.isApprovedForAll(msg.sender, address(this)));
        // opensea에서는 nft 마켓에 메타마스크를 연결할때 setApprovedForAll() 함수를 실행해서 자신이 소유한 모든 NFT 권한을 opensea에 위임하게 된다.

        // 토큰의 가격을 토큰 아이디 인덱스에 가격 추가
        tokenPrices[_tokenId] = _price;

        // 판매 리스트에 토큰 아이디 추가
        SellTokenList.push(_tokenId);
    }

    // 토큰 구매 함수
    function PurchaseToken(uint256 _tokenId) public payable {
        // 토큰 소유자 계정 가져옴
        address tokenOwner = Token.ownerOf(_tokenId);

        // 판매자가 자신의 토큰을 구매하지 못하게
        require(tokenOwner != msg.sender);

        // 판매중인 토큰만 구매할 수 있도록 판매중인지 체크(tokenPrices에서 토큰아이디에 해당하는 가격이 0 이상이면 판매로 등록되있다고 판단)
        require(tokenPrices[_tokenId] > 0);

        // 구매자가 지불한 ㅣㅇ더가 판매 가격 이상인지 체크
        require(tokenPrices[_tokenId] < msg.value);

        // CA가 토큰 판매자에게 이더 전송
        payable(tokenOwner).transfer(msg.value);

        // 구매자에게 토큰 전달
        Token.transferFrom(tokenOwner, msg.sender, _tokenId);

        // 토큰 아이디 : 계정 주소
        // {
        //     1 :"0xqwueklrjasdf"
        // }

        // 판매완료 했으니 해당하는 가격 0으로 설정
        tokenPrices[_tokenId] = 0;
        popSellToken(_tokenId);
    }

    function popSellToken(uint256 _tokenId) private returns (bool) {
        for (uint256 i = 0; i < SellTokenList.length; i++) {
            if (SellTokenList[i] == _tokenId) {
                SellTokenList[i] = SellTokenList[SellTokenList.length - 1];
                SellTokenList.pop();
                return true;
            }
        }
        return false;
    }

    // 전체 판매 리스트 확인, 전체 확인은 view를 사용해야 한다.
    function getSellTokenList() public view returns (TokenInfo[] memory) {
        // 리스트의 길이가 있을때
        require(SellTokenList.length > 0);

        // SellTokenList 리스트 길이 만큼 빈값을 가지게 배열을 만들어준다.
        // const arr = new Array(SellTokenList.length);  이런 의미
        TokenInfo[] memory list = new TokenInfo[](SellTokenList.length);

        for (uint256 i = 0; i < SellTokenList.length; i++) {
            uint256 tokenId = SellTokenList[i];
            uint256 Rank = Token.getTokenRank(tokenId);
            uint256 Type = Token.getTokenType(tokenId);
            uint256 price = tokenPrices[tokenId];

            // list 배열에 만들어진 구조체 담아줌
            list[i] = TokenInfo(tokenId, Rank, Type, price);
        }
        // for문으로 생성하면 이런식으로 만들어져있을것임.
        // [{tokenId : 20, Rank : 2, Type: 3, price : 100000},{tokenId : 13, Rank : 1, Type: 4, price : 100000}]
        return list;
    }

    // 소유하고 있는 NFT 리스트 view 함수
    function getOwnerToken(address _tokenOwner)
        public
        view
        returns (TokenInfo[] memory)
    {
        uint256 balance = Token.balanceOf(_tokenOwner);
        // 비어있는지 확인
        require(balance != 0);

        // balance 크기의 빈배열 생성
        TokenInfo[] memory list = new TokenInfo[](balance);

        for (uint256 i = 0; i < balance; i++) {
            // 토큰 소유자의 토큰 인덱스를 순서대로 가져온다.
            uint256 tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, i);
            uint256 Rank = Token.getTokenRank(tokenId);
            uint256 Type = Token.getTokenType(tokenId);
            uint256 price = tokenPrices[tokenId];

            list[i] = TokenInfo(tokenId, Rank, Type, price);
        }

        return list;
    }

    // 제일 최신 NFT 보여주는 view 함수, 민팅 시 바로 보여주기 위한 용도
    function getLatestToken(address _tokenOwner)
        public
        view
        returns (TokenInfo memory)
    {
        uint256 _balance = Token.balanceOf(_tokenOwner);
        uint256 tokenId = Token.tokenOfOwnerByIndex(_tokenOwner, _balance - 1);
        uint256 Rank = Token.getTokenRank(tokenId);
        uint256 Type = Token.getTokenType(tokenId);
        uint256 price = tokenPrices[tokenId];

        return TokenInfo(tokenId, Rank, Type, price);
    }
}
