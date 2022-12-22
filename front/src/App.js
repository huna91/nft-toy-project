import "./App.css";
import { Main, Minting, Shop, Mypage } from "./pages";
import { Header, Loading } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Web3 from "web3/dist/web3.min.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [theme, setTheme] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  //================== 메타마스크 로그인 ====================
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
    setAccount(_accounts);
    return _accounts;
  };

  // 네트워크 추가 함수
  const addNetwork = async (_chainId) => {
    const netWork = {
      chainId: _chainId,
      chainName: "Goerli ",
      rpcUrls: ["https://goerli.infura.io/v3/"],
      nativeCurrency: {
        name: "GoerliETH",
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
  const login = async () => {
    console.log("로그인시도");
    try {
      const targetChainId = "0x5";
      const chainId = await getChainId();
      console.log("체인아이디 확인 : ", chainId);
      if (targetChainId != chainId) {
        addNetwork(targetChainId);
      }

      const [_accounts] = await getAccounts();

      const _web3 = new Web3(window.ethereum);

      setWeb3(_web3);
      if (_accounts) setIsLogin(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Header
          isLogin={isLogin}
          theme={theme}
          setTheme={setTheme}
          login={login}
        />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/minting" element={<Minting />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
