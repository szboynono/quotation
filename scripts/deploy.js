const hre = require("hardhat");

async function main() {
  const MintQuote = await hre.ethers.getContractFactory("MintQuote");
  const mintQuote = await MintQuote.deploy();

  console.log("MintQuote deployed to:", mintQuote.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
