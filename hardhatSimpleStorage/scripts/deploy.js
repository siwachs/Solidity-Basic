const { ethers } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");

  const simpleStorage = await SimpleStorageFactory.deploy();
  console.log("Deployment TX = ", simpleStorage.deploymentTransaction());
  console.log("Deployed contract address = ", await simpleStorage.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(JSON.stringify(e.message, null, 2));
    process.exit(0);
  });
