import { JsonRpcProvider, Wallet, ContractFactory } from "ethers";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new JsonRpcProvider(process.env.TESTNET_RCP_URL);

  const wallet = new Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

  const abi = JSON.parse(fs.readFileSync(process.env.CONTRACT_ABI, "utf-8"));
  const binary = fs
    .readFileSync(process.env.CONTRACT_BINARY, "utf-8")
    .toString();

  // ABI to interact with contract it have all the methods defined in contract, binary is compiled code and wallet is use to sign contract with private key.
  const contractFactory = new ContractFactory(abi, binary, wallet);
  console.log("Deploying...");

  const contract = await contractFactory.deploy({ gasLimit: 5000000 }); // Wait for contract to deploy
  console.log("Contract = ", contract);

  // wait for one block to add during deployment
  const deploymentReceipt = await contract.deploymentTransaction().wait(1);
  console.log("Deployment Receipt = ", deploymentReceipt);

  // Interact With Contract
  const currentFavoriteNumber = await contract.retrieve();

  // Return BigInt 0n
  console.log(
    "Current Favorite Number is = ",
    currentFavoriteNumber.toString()
  );

  // NOTE: Tx response and Tx Receipt are different.
  const txResponse = await contract.store("90");
  console.log("Tx Receipt = ", await txResponse.wait(1));
}

async function deployContractWithTxData() {
  const provider = new JsonRpcProvider(process.env.RPC_URL);

  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, provider);

  // ABI use to interact with contract
  const abi = JSON.parse(fs.readFileSync(process.env.CONTRACT_ABI, "utf-8"));
  console.log("ABI = ", abi);

  const binary = fs
    .readFileSync(process.env.CONTRACT_BINARY, "utf-8")
    .toString();

  // Create Transaction and deploy contract with transaction data
  const nonce = await wallet.getNonce();
  const tx = {
    nonce,
    gasPrice: 2000000000,
    gasLimit: 5000000,
    to: null,
    value: 0,
    data: `0x${binary}`,
    chainId: 1337,
  };

  const signedTxResponse = await wallet.signTransaction(tx);
  console.log("signed Tx response = ", signedTxResponse);

  const sentTxResponse = await wallet.sendTransaction(tx);
  await sentTxResponse.wait(1);
  console.log("sent Tx response = ", sentTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(JSON.stringify(error.message, null, 2));
  });
