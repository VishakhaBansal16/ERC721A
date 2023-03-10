import { init } from "./mint-nft.js";
export const mintTransaction = async (req, res) => {
  try {
    //Get user input
    const { to, amount } = req.body;
    if (!(to, amount)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }
    init(to, amount);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
