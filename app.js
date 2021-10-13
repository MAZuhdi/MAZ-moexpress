const { Router } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const port = process.env.PORT || 8100;
const v1 = require("./api/v1.0"); //Version 1 Router
const v2 = require("./api/v2.0"); //Version 2 Router

require("./config/db.config");

app.use(morgan("dev")); //Log purposes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/v1", v1);
app.use("/api/v2", v2);
app.use("/api/", v2); // Set the default version to latest.

// General Error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
