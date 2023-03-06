import { init } from "./mint-nft.js";
export const mintTransaction = async (req, res, next) => {
  try {
    //Get user input
    const { tokenURI } = req.body;
    if (!(to, amount)) {
      res.status(400).json({
        status: "failed",
        message: "All inputs are required",
      });
    }
    init(tokenURI);

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
