require("@nomiclabs/hardhat-etherscan");
const hre = require("hardhat");
async function main() {
  await hre.run("verify:verify", {
    address: "0xA8Da889eFeb4C5477a3B096Fa337E251456D3Cd0",
    constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
