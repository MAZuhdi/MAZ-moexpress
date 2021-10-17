// url: "mongodb://localhost:27017/{nama database}"
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/collect_moexpress", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: true,
});
// mongoose.connect(
//   "mongodb+srv://MAZuhdi:" +
//     process.env.MONGO_ATLAS_PW +
//     "@maz-cluster.jw2cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useFindAndModify: true,
//   }
// );

mongoose.Promise = global.Promise; //use default js promise instead mongoose promise

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
  console.log("Database Connected");
});

/*
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://MAZuhdi:" +
  process.env.MONGO_ATLAS_PW +
  "@maz-cluster.jw2cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("maz-cluster").collection("moexpress-shop");
  // perform actions on the collection object
  client.close();
});
*/
