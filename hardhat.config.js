require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
//require("@nomicfoundation/hardhat-chai-matchers");
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: process.env.INFURA_API_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },

  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY,
    },
    // customChains: [],
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
