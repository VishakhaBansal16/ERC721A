require("dotenv").config();

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.INFURA_API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "0xA8Da889eFeb4C5477a3B096Fa337E251456D3Cd0";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
//create transaction
const init = async (tokenURI) => {
  const nonce = await web3.eth.getTransactionCount(
    process.env.PUBLIC_KEY,
    "latest"
  ); //get latest nonce

  //the transaction
  const tx = {
    from: process.env.PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods
      .mintNFT(process.env.PUBLIC_KEY, tokenURI)
      .encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(
    tx,
    process.env.PRIVATE_KEY
  );
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log("The hash of your transaction is: ", hash);
          } else {
            console.log(err);
          }
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = { init };
