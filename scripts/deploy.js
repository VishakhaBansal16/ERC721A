require("@nomiclabs/hardhat-ethers");
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFTContract");

  const myNFT = await MyNFT.deploy();
  await myNFT.deployed();
  console.log("Contract deployed to the address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
