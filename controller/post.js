//Ada method yg namnya default di slugify, trus kita kasih alias generateSlug
const { default: generateSlug } = require("slugify");
const Post = require("../models/post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      message: "All posts",
      data: posts,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const slug = generateSlug(title).toLowerCase();

    //Cara new post
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      slug: slug,
      // Kalo ada, pake body.published, kalo gada, isi false
      published: req.body.published ? req.body.published : false,
    });

    post.save(post);

    // Cara simple
    // const post = await Post.create({
    //   title,
    //   slug,
    //   body,
    //   published,
    // });

    if (post) {
      res.status(201).json({
        status: "success",
        message: "Post created",
        data: post,
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

    const post = await Post.findById(id);

    if (post) {
      res.status(200).json({
        status: "success",
        message: "Show specific posts",
        data: post,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(409).json({
      status: "failed",
      message: error.message || "Some error while showing post.",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findByIdAndUpdate(id, req.body);

    if (post) {
      res.status(200).json({
        status: "success",
        message: "Post updated",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(409).json({
      status: "failed",
      message: error.message || "Some error while showing post.",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const deletePost = await Post.findByIdAndRemove(id);

    if (deletePost) {
      res.status(200).json({
        status: "success",
        message: "Post deleted",
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "Post not found",
      });
    }
  } catch (error) {
    res.status(409).json({
      status: "failed",
      message: error.message || "Some error while deleting post.",
    });
  }
};

module.exports = { getAllPosts, createPost, findOne, updatePost, deletePost };
