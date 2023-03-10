require("@nomiclabs/hardhat-etherscan");
const hre = require("hardhat");
async function main() {
  await hre.run("verify:verify", {
    address: "0xf1120C2CeeB7c87fa5A86B97909188F3f5c9310A",
    constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
