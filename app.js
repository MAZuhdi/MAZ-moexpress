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
