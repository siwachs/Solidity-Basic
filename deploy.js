import { JsonRpcProvider, Wallet, ContractFactory } from "ethers";
import fs from "fs";

async function main() {
  const provider = new JsonRpcProvider("http://127.0.0.1:7545");

  const wallet = new Wallet(
    "0x3ae555f7564c63913139d2b8b9c0154858bb8e184b7acab215b9b206af4504f7",
    provider
  );

  const abi = JSON.parse(
    fs.readFileSync(
      "./out/ethersSimpleStorage_SimpleStorage_sol_SimpleStorage.abi",
      "utf-8"
    )
  );
  const binary = fs
    .readFileSync(
      "./out/ethersSimpleStorage_SimpleStorage_sol_SimpleStorage.bin",
      "utf-8"
    )
    .toString();

  // ABI to interact with contract, binary is compiled code and wallet is use to sign contract with private key.
  const contractFactory = new ContractFactory(abi, binary, wallet);
  console.log("Deploying...");

  const contract = await contractFactory.deploy({ gasLimit: 5000000 }); // Wait for contract to deploy
  console.log("Contract = ", contract);

  // wait for one block to add during deployment
  const deploymentReceipt = await contract.deploymentTransaction().wait(1);
  console.log("Deployment Receipt = ", deploymentReceipt);

  // Create Transaction and deploy contract with transaction data
  // const nonce = await wallet.getNonce();
  // const tx = {
  //   nonce,
  //   gasPrice: 2000000000,
  //   gasLimit: 5000000,
  //   to: null,
  //   value: 0,
  //   data: `0x${binary}`, // Smart contract Binary
  //   chainId: 1337, // Or 31337
  // };

  // const signedTxResponse = await wallet.signTransaction(tx);
  // console.log("signed Tx response = ", signedTxResponse);

  // const sentTxResponse = await wallet.sendTransaction(tx);
  // await sentTxResponse.wait(1);
  // console.log("sent Tx response = ", sentTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(JSON.stringify(error.message, null, 2));
  });
