const express = require("express");
const { default: generateSlug } = require("slugify");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + generateSlug(file.originalname).toLowerCase());
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    //accept file
    cb(null, true);
  } else {
    //reject file
    cb(new Error("File type not accepted"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 2024 * 5 }, // 5 megabyte
  fileFilter: fileFilter,
});
// const upload = multer({ dest: "uploads/" });

const productsRouter = express.Router();
const {
  indexProducts,
  createProduct,
  findOne,
  updateProduct,
  deleteProduct,
} = require("../controller/Product");

productsRouter.get("/", indexProducts);
productsRouter.post("/", upload.single("productImage"), createProduct);
productsRouter.get("/:id", findOne);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
