//Ada method yg namnya default di slugify, trus kita kasih alias generateSlug
const { default: generateSlug } = require("slugify");
const Product = require("../../../models/product");

const indexProducts = async (req, res) => {
  try {
    const product = await Product.find();
    if (product) {
      res.status(200).json({
        status: "success",
        message: "All Product",
        data: product,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "All Product",
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

const createProduct = async (req, res) => {
  try {
    const { name, desc, price } = req.body;
    const slug = generateSlug(name).toLowerCase();

    //Cara new product
    const product = new Product({
      name: req.body.name,
      desc: req.body.desc,
      slug: slug,
      price: req.body.price,
      // Kalo ada, pake body.published, kalo gada, isi false
      published: req.body.published ? req.body.published : false,
    });

    product.save(product);

    // Cara simple
    // const product = await Product.create({
    //   name,
    //   slug,
    //   desc,
    //   price,
    //   published,
    // });

    if (product) {
      res.status(201).json({
        status: "success",
        message: "Product created",
        data: product,
      });
    }
  } catch (error) {
    res.status(422).json({
      status: "failed",
      message: error.message,
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (product) {
      res.status(200).json({
        status: "success",
        message: "Show specific Product",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(409).json({
      status: "failed",
      message: error.message || "Some error while showing product.",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const slug = generateSlug(req.body.name).toLowerCase();
    req.body.slug = slug;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (product) {
      res.status(200).json({
        status: "success",
        message: "Product updated",
        data: product,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(409).json({
      status: "failed",
      message: error.message || "Some error while showing product.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteProduct = await Product.findByIdAndRemove(id);

    if (deleteProduct) {
      res.status(200).json({
        status: "success",
        message: "Product deleted",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(409).json({
      status: "failed",
      message: error.message || "Some error while deleting product.",
    });
  }
};

module.exports = {
  indexProducts,
  createProduct,
  findOne,
  updateProduct,
  deleteProduct,
};
