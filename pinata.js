import pinataSDK from "@pinata/sdk";
import dotenv from "dotenv/config";
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);
/*
//to upload images one by one
import fs from "fs";
const readableStreamForFile = fs.createReadStream("./metadata/json/10.json");
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
*/
//to upload json folder
const sourcePath = "/Users/EXPERT/OneDrive/Desktop/development/metadata/json";
const options1 = {
  pinataMetadata: {
    name: "json folder",
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
  .pinFromFS(sourcePath, options1)
  .then((result) => {
    //handle results here
    console.log(result);
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });
