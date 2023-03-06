import express from "express";
import { mintTransaction } from "./controller.js";
export const mint_route = express.Router();

mint_route.route("/mintTransaction").post(mintTransaction);
