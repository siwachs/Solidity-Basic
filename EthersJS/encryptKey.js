// import { Wallet } from "ethers";
// import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

async function main() {
  // const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY);
}

main()
  .then(() => process.exit(0))
  .catch((error) => console.error(JSON.stringify(error.message, null, 2)));
