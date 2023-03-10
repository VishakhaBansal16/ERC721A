import dotenv from "dotenv/config";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ABI } from "./ABI.js";
const web3 = createAlchemyWeb3(process.env.INFURA_API_URL);
const contractAddress = "0xf1120C2CeeB7c87fa5A86B97909188F3f5c9310A";
const myContract = new web3.eth.Contract(ABI, contractAddress);

//mint
export const init = async (address, amount) => {
  const tx = myContract.methods.mint(address, amount);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: myContract.options.address,
      data,
      gas,
      gasPrice,
      nonce,
    },
    process.env.PRIVATE_KEY
  );
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
};
