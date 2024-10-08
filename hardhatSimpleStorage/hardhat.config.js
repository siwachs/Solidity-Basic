require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const TESTNET_RCP_URL = process.env.TESTNET_RCP_URL;
const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    testnet: {
      url: TESTNET_RCP_URL,
      accounts: [TESTNET_PRIVATE_KEY],
      chainId: 11155111, //ETH Testnet
    },
  },
  solidity: "0.8.19",
};
