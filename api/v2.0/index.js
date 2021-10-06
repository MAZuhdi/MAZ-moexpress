const express = require("express");
const v2 = express.Router();
const orderRouter = require("./routes/order");
const productsRouter = require("./routes/products");

// Hello World
v2.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This is v2 version of our API",
  });
});

v2.use("/products", productsRouter);
v2.use("/orders", orderRouter);

module.exports = v2;
