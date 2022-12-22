import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";

const useMetamask = () => {
  // 주소 컨트롤
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  // 연결된 메타마스크의 체인아이디 가져옴
  const getChainId = async () => {
    const _chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    return _chainId;
  };

  // 연결된 메타마스크의 계정 가져옴.
  const getAccounts = async () => {
    const _accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // 계정 확인
    console.log(_accounts);
    return _accounts;
  };

  // 네트워크 추가 함수
  const addNetwork = async (_chainId) => {
    const netWork = {
      chainId: _chainId,
      chainName: "Ganache",
      rpcUrls: ["http://127.0.0.1:8545"],
      nativeCurrency: {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
      },
    };

    // _chainId로 받은 체인아이디 네트워크 추가
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [netWork],
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const targetChainId = "0x539";
        const chainId = await getChainId();
        console.log("체인아이디 확인 : ", chainId);
        if (targetChainId != chainId) {
          addNetwork(targetChainId);
        }

        const [_accounts] = await getAccounts();

        const _web3 = new Web3(window.ethereum);

        setAccount(_accounts);
        setWeb3(_web3);
      } catch (err) {
        console.log(err);
      }
    };
    if (window.ethereum) {
      init();
    }
  }, []);

  return [account, web3];
};

export default useMetamask;
