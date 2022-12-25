
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY,MNEMONIC,ETHEREUM_NETWORK,SIGNER_PRIVATE_KEY } = process.env;
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "7722",
    },
		goerli: {
			provider: () =>
        new HDWalletProvider(
              {
            mnemonic: {
              phrase: MNEMONIC
            },
            providerOrUrl: INFURA_API_KEY,
          }
        ),
			network_id: 5,
		},
  },

  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};