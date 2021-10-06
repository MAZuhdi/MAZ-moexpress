const express = require("express");
const productsRouter = express.Router();
const {
  indexProducts,
  createProduct,
  findOne,
  updateProduct,
  deleteProduct,
} = require("../controller/Product");

productsRouter.get("/", indexProducts);
productsRouter.post("/", createProduct);
productsRouter.get("/:id", findOne);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
