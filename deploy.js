import { ethers } from "ethers";
import fs from "fs";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "0xaf2113b196595d26c19f5dbcf0baf1409f84680271f3fcbd7a0009b2496bd077",
    provider
  );

  const abi = fs.readFileSync(
    "./out/ethersSimpleStorage_SimpleStorage_sol_SimpleStorage.abi",
    "utf-8"
  );
  const binary = fs.readFileSync(
    "./out/ethersSimpleStorage_SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );

  // ABI to interact with contract, binary is compiled code and wallet is use to sign contract with private key.
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying...");

  const contract = await contractFactory.deploy({ gasLimit: 3000000 });
  console.log("Contract = ", contract);

  // wait for one block to add during deployment
  const deploymentReceipt = await contract.deployTransaction.wait(1);
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
