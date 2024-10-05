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
      "./out/ethersSimpleStorage_FallbackExample_sol_FallbackExample.abi",
      "utf-8"
    )
  );
  const binary = fs
    .readFileSync(
      "./out/ethersSimpleStorage_FallbackExample_sol_FallbackExample.bin",
      "utf-8"
    )
    .toString();

  // ABI to interact with contract, binary is compiled code and wallet is use to sign contract with private key.
  const contractFactory = new ContractFactory(abi, binary, wallet);
  console.log("Deploying...");

  const contract = await contractFactory.deploy({ gasLimit: 3000000 }); // Wait for contract to deploy
  console.log("Contract = ", contract);

  // wait for one block to add during deployment
  const deploymentReceipt = await contract.deploymentTransaction.wait(1);
  console.log("Deployment Receipt = ", deploymentReceipt);

  const tx = {
    nonce: 9,
    gasPrice: 2000000000,
    gasLimit: 3000000,
    to: null,
    valuse: 0,
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(JSON.stringify(error.message, null, 2));
  });
