const express = require("express");

const productsRouter = express.Router();
const {
  getAllProducts,
  createProduct,
  findOne,
  updateProduct,
  deleteProduct,
} = require("../controller/Product");

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", findOne);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
