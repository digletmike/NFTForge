const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const providerFactory = (network) =>
  new HDWalletProvider(
    process.env.PRIVATE_KEY,
    `https://${network}.infura.io/v3/${process.env.INFURA_KEY}`
  );

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 666,
      gasPrice: 35e9,
    },
    upgrade: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 666,
      gasPrice: 35e9,
    },
    test: {
      host: "127.0.0.1",
      port: 8545,
      network_id: 666,
      gasPrice: 35e9,
    },
    rinkeby: {
      provider: () => providerFactory("rinkeby"),
      network_id: 4,
      gas: 6e6,
      gasPrice: 10e9, // 10 Gwei
      skipDryRun: true,
    },
    rinkebyUpgrade: {
      provider: () => providerFactory("rinkeby"),
      network_id: 4,
      gas: 6e6,
      gasPrice: 10e9, // 10 Gwei
      skipDryRun: true,
    },
    mainnet: {
      provider: () => providerFactory("mainnet"),
      network_id: 1,
      gasPrice: 20e9, // 20 Gwei, Change this value according to price average of the deployment time
      gas: 2e6,
    },
  },
  compilers: {
    solc: {
      version: "0.7.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};
