const express = require("express");

const User = require("../../../models/user");

const bcrypt = require("bcrypt");

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

const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  User.find()
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "this is all of our users",
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

userRouter.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "email already been used",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                  res: result,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

userRouter.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          return res.status(200).json({
            message: "Auth successful",
          });
        }
        return res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

userRouter.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "user deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

userRouter.post("/login");

module.exports = userRouter;
