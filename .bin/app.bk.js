//import express
const express = require("express");
//import cors
const cors = require("cors");
//objek express
const app = express();

//agar selalu parse dengan json
app.use(express.json());
//tapi bisa jadi tidak selalu berbentuk json, tapi urlencoded form
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models/"); //kita mau akses index.js, tapi index.js gosah ditulis, karena "index"
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected successfully!`);
  })
  .catch((err) => {
    console.log(`Cannot connect to the Database!`, err);
    process.exit();
  });

app.get("/", (req, res) => {
  //res adalah parameter dari method get untuk mengirimkan respon kepada client
  res.json({
    message: "welcome to express mongodb REST API",
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
