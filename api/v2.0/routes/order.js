const express = require("express");
const {
  indexOrder,
  createOrder,
  findOneOrder,
  deleteOrder,
  updateOrder,
} = require("../controller/order");
const orderRouter = express.Router();

orderRouter.get("/", indexOrder);
orderRouter.post("/", createOrder);
orderRouter.get("/:orderId", findOneOrder);
orderRouter.delete("/:orderId", deleteOrder);
orderRouter.patch("/:orderId", updateOrder);

module.exports = orderRouter;
