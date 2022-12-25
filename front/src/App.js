import "./App.css";
import { Main, Minting, Shop, Mypage } from "./pages";
import { Header, Loading } from "./components";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Web3 from "web3/dist/web3.min.js";
import { Alert, Stack, AlertTitle } from "@mui/material";
import MintNFT from "../src/contract/MintNFT.json";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [theme, setTheme] = useState("light");
  const [count, setCount] = useState(null);
  const [deployed, setDeployed] = useState(null);
  const [getTokenURI, setTokenURI] = useState([]);
  const [getBalance, setGetBalance] = useState();
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  //================== 메타마스크 로그인 ====================
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const getAccounts = async () => {
    const _accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return _accounts;
  };

 const login = async () => {
    try {
        const [_accounts] = await getAccounts();
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const CA = MintNFT.networks[networkId].address;
        const abi = MintNFT.abi;
        const Deployed = await new web3.eth.Contract(abi, CA);
        const count = await Deployed.methods.getTokenCount().call();
        const getOwnerBalance = await web3.eth.getBalance(_accounts);
        let tokenURI = [];

        for (let i = 1; i < 60; i++) {
            let a = await Deployed.methods.tokenURI(i).call();
            tokenURI.push(a);
        }
        setTokenURI(tokenURI)
        setDeployed(Deployed);
        setWeb3(web3);
        setCount(count);
        setGetBalance(getOwnerBalance);
        if (_accounts) setIsLogin(true);
    } catch (err) {
        console.log(err);
    }
};

  return (
    <ThemeProvider theme={darkTheme}>
      {isLogin ? <div>{getTokenURI}</div> : "fail"}
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
          <Route
            path="/mypage"
            element={<Mypage web3={web3} account={account} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
