const Monster_NFT_Data = artifacts.require("Monster_NFT_Data");
const NFT_Shop = artifacts.require("NFT_Shop");

module.exports = async function (deployer) {
  await deployer.deploy(
    Monster_NFT_Data,
    "MONEYE",
    "ETH",
    "https://gateway.pinata.cloud/ipfs/QmUDGgUf8jmD1Ckqqh6Pe9K1P68NjMbVCM7dgoKqURt7LJ"
  );
  const token = await Monster_NFT_Data.deployed();
  await deployer.deploy(NFT_Shop, token.address);
  const sellToken = await NFT_Shop.deployed();
};
