import React, { useEffect, useState } from "react";
import NFTContract from "";

const Mypage = ({ web3, account }) => {
  console.log(web3);
  console.log(account);
  const [haveNFT, setHaveNFT] = useState();
  const [deployed, setDeployed] = useState();
  const [CA, setCA] = useState();

  useEffect(() => {
    (async () => {
      if (!web3) return <div>로그인 해주세요.</div>;
      const networkId = await web3.eth.net.getId();
      const instance = await new web3.eth.Contract(
        NFTContract.abi,
        NFTContract.networks[networkId].address
      );
      const currentNFT = await instance.methods.getNFT().call();
      setHaveNFT(currentNFT);
      setDeployed(instance);
      setCA(NFTContract.networks[networkId].address);
    })();
  }, []);
  return (
    <div>
      계정 : {account}
      ?? : {web3}
    </div>
  );
};

export default Mypage;
