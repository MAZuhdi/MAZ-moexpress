const express = require("express");
const v1 = express.Router();
const productsRouter = require("./routes/products");
v1.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This is v1 version of our API",
  });
});
v1.use("/products", productsRouter);

module.exports = v1;
