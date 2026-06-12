import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import type { HardhatUserConfig } from "hardhat/config";

const privateKey = process.env.MANTLE_SEPOLIA_PRIVATE_KEY;
// Mantlescan accepts its own key; Etherscan V2 also covers Mantle Sepolia (5003)
// with a single unified key. Either is fine; empty string keeps deploy unblocked.
const mantlescanApiKey =
  process.env.MANTLESCAN_API_KEY ?? process.env.ETHERSCAN_API_KEY ?? "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    mantleSepolia: {
      url: process.env.MANTLE_SEPOLIA_RPC_URL ?? "https://rpc.sepolia.mantle.xyz",
      chainId: 5003,
      accounts: privateKey ? [privateKey] : []
    }
  },
  etherscan: {
    apiKey: {
      mantleSepolia: mantlescanApiKey
    },
    customChains: [
      {
        network: "mantleSepolia",
        chainId: 5003,
        urls: {
          apiURL: "https://api-sepolia.mantlescan.xyz/api",
          browserURL: "https://sepolia.mantlescan.xyz"
        }
      }
    ]
  }
};

export default config;
