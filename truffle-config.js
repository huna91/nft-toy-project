module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "7722",
    },
    goerli: {
      provider: new Web3.providers.HttpProvider("https://rpc-goerli.gastracker.io"),
      network_id: '5',
    },
  },

  compilers: {
    solc: {
      version: "0.8.17",
    },
  },
};
