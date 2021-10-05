//agar modul dapat bisa diimport denga require("")

// url: "mongodb://localhost:27017/{nama database}"
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/collect_moexpress", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
  console.log("Database Connected");
});
