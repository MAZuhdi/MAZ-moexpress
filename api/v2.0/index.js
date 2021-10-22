const express = require("express");
const v2 = express.Router();
const orderRouter = require("./routes/order");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

// Hello World
v2.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "This is v2 version of our API",
  });
});

v2.use("/products", productRouter);
v2.use("/orders", orderRouter);
v2.use("/users", userRouter);

module.exports = v2;
