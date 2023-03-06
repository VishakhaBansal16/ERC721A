require("dotenv").config();
const { mint_route } = require("./route.js");
const port = process.env.API_PORT || 3000;
const createError = require("http-errors");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", mint_route);

app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

//error handler
app.use((err, req, res, next) => {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.status(404).json({
    status: "failed",
    message: "Page not found",
  });
  res.status(500).json({
    status: "failed",
    message: "Internal server error",
  });
});

// server listening
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
