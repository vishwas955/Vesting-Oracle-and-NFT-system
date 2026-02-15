import type { HardhatUserConfig } from "hardhat/config";
import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
dotenv.config();

// const sepoliaPrivateKey = process.env.SEPOLIA_TESTNET_PRIVATEKEY;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url: process.env.SEPOLIA_TESTNET_RPC_URL,
      accounts: process.env.SEPOLIA_TESTNET_PRIVATEKEY ? [process.env.SEPOLIA_TESTNET_PRIVATEKEY] : [],
      chainId:11155111
    }
  }
};

export default config;
