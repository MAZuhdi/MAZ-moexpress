const express = require("express");
const app = express();
const port = process.env.PORT || 8100;
const APIversion = 1;
const postRouter = require("./routes/post");

require("./config/db.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/v${APIversion}`, postRouter);

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}`);
});
