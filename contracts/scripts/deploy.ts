import { ethers, network } from "hardhat";

// Deploys ReceiptAnchor (no constructor args) and prints the deployed address
// and deployment transaction hash. This script never reads, stores, or prints a
// private key beyond what Hardhat resolves from the selected network config.
//
// On the in-memory Hardhat network (no --network, or --network hardhat) this is a
// `local dry-run` and its address MUST NOT be recorded as a Mantle Sepolia deploy.
async function main() {
  const isLocal = network.name === "hardhat" || network.name === "localhost";
  const label = isLocal ? "local dry-run" : network.name;

  const anchor = await ethers.deployContract("ReceiptAnchor");
  await anchor.waitForDeployment();

  const address = await anchor.getAddress();
  const deployTxHash = anchor.deploymentTransaction()?.hash ?? "n/a";

  console.log(`[${label}] ReceiptAnchor deployed`);
  console.log(`network: ${network.name}`);
  console.log(`address: ${address}`);
  console.log(`deployTxHash: ${deployTxHash}`);

  if (isLocal) {
    console.log(
      "note: local dry-run only — do not record this address as a Mantle Sepolia deployment."
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
