import pinataSDK from "@pinata/sdk";
import dotenv from "dotenv/config";
const pinata = new pinataSDK(process.env.API_KEY, process.env.API_SECRET);
/*
pinata
  .testAuthentication()
  .then((result) => {
    //handle successful authentication here
    console.log(result);
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });
*/

import fs from "fs";
const readableStreamForFile = fs.createReadStream("./metadata/images/10.jfif");
const options = {
  pinataMetadata: {
    name: "Art 10",
    keyvalues: {
      customKey: "customValue",
      customKey2: "customValue2",
    },
  },
  pinataOptions: {
    cidVersion: 0,
  },
};
pinata
  .pinFileToIPFS(readableStreamForFile, options)
  .then((result) => {
    //handle results here
    console.log(result);
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });
