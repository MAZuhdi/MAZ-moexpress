const { default: generateSlug } = require("slugify");
const Order = require("../../../models/order");

const indexOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (orders) {
      res.status(200).json({
        status: "success",
        message: "All orders",
        data: orders,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "All orders",
        data: "null",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const createOrder = async (req, res, next) => {
  try {
  } catch (error) {}
};
