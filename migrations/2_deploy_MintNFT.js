
const MintNFT = artifacts.require("MintNFT");
module.exports = async function (deployer) {
  await deployer.deploy(MintNFT,"https://gateway.pinata.cloud/ipfs/QmUDGgUf8jmD1Ckqqh6Pe9K1P68NjMbVCM7dgoKqURt7LJ");
};
