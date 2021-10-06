const express = require("express");
const orderRouter = express.Router();

orderRouter.get("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "This is Order Router v2",
  });
});

module.exports = orderRouter;
