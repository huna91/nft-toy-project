import useMetamask from "../../hooks/useMetamask";
import { useState, useEffect } from "react";

const Login = () => {
  const [account, web3] = useMetamask();
  const [isLogin, setIsLogin] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await web3.eth.sendTransaction({
      from: account,
      to: e.target.received.value,
      value: web3.utils.toWei(e.target.amount.value, "ether"),
    });
  };

  useEffect(() => {
    const init = async () => {
      const balance = await web3?.eth.getBalance(account);
      setBalance(balance / 10 ** 10);
    };
    if (account) setIsLogin(true);
    init();
  }, [account]);

  if (!isLogin) return <div>메타마스크 로그인 해주세요.</div>;

  return <div>Login</div>;
};

export default Login;
