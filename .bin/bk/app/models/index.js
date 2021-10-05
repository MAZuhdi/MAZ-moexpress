//import config db
const dbConfig = require("../../config/db.config");
const mongoose = require("mongoose");

//promise itu dari async
// Represents the completion of an asynchronous operation
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.posts = require("./post.model")(mongoose);

module.exports = db;
