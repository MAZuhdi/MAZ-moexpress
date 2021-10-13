// DISCLAIMER! The inconsistency of this code is for Learning Purposes,
//showing that many way to do the same thing, and every way got its advantage

const { default: generateSlug } = require("slugify");
const Order = require("../../../models/order");

const indexOrder = async (req, res, next) => {
  Order.find()
    .exec()
    .then((orders) => {
      if (orders.length) {
        console.log(orders);
        res.status(200).json({
          status: "success",
          message: "All orders",
          data: orders,
        });
      } else {
        res.status(200).json({
          status: "success",
          message: "All orders of null",
          data: "null",
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        status: "failed",
        message: error.message,
      });
    });
};

const createOrder = async (req, res, next) => {
  const order = new Order({
    na,
  });
};

module.exports = { indexOrder, createOrder };
