// DISCLAIMER! The inconsistency of this code is for Learning Purposes,
//showing that many way to do the same thing, and every way got its advantage

const { default: generateSlug } = require("slugify");
const order = require("../../../models/order");
const Order = require("../../../models/order");
const Product = require("../../../models/product");
const indexOrder = async (req, res, next) => {
  Order.find()
    .select("product quantity createdAt")
    .populate("product", "name desc price")
    .exec()
    .then((orders) => {
      if (orders.length) {
        console.log(orders);
        res.status(200).json({
          status: "success",
          message: "All orders",
          count: orders.length,
          orders: orders.map((doc) => {
            return {
              _id: doc._id,
              product: doc.product,
              quantity: doc.quantity,
              request: {
                type: "GET",
                url: "http://localhost:8100/api/v2/orders/" + doc._id,
              },
            };
          }),
        });
      } else {
        res.status(404).json({
          status: "success",
          message: "All orders of null",
          data: "null",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: "failed",
        message: error.message,
      });
    });
};

const createOrder = async (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      const order = new Order({
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        status: "success",
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:8100/api/v2/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          status: "failed",
          error: err,
        });
    });
};

const findOneOrder = async (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product")
    .exec()
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          status: "not found",
          message: "Order not found",
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:8100/api/v2/orders/",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const updateOrder = async (req, res, next) => {
  const id = req.params.orderId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Order.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const deleteOrder = async (req, res, next) => {
  var order = Order.findById(req.params.id);
  if (order.length == 0) {
    return res.status(404).json({
      message: "Order not found",
    });
  }
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:8100/api/v2/orders/",
          body: {
            productId: "ID",
            quantity: "Number",
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

module.exports = {
  indexOrder,
  createOrder,
  findOneOrder,
  deleteOrder,
  updateOrder,
};
