const express = require("express");
const mintTransaction = require("./controller.js");
const mint_route = express.Router();

mint_route.route("/mintTransaction").post(mintTransaction);
module.exports = { mint_route };
