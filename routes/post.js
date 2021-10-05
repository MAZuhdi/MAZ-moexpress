const express = require("express");

const router = express.Router();
const {
  getAllPosts,
  createPost,
  findOne,
  updatePost,
  deletePost,
} = require("../controller/post");

router.get("/", (req, res) => {
  res.send({
    message: "Hello",
  });
});

router.get("/posts", getAllPosts);
router.get("/posts/:id", findOne);
router.post("/posts", createPost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

module.exports = router;
