const express = require("express");
const { indexOrder } = require("../controller/order");
const orderRouter = express.Router();

orderRouter.get("/", indexOrder);

module.exports = orderRouter;
