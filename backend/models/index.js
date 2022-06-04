const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./userModel");
db.role = require("./roleModel");
db.refreshToken = require("./refreshTokenModel");

db.chatBot = require("./chatBotModel");

// Blog Models
db.category = require("./categoryModel");
db.post = require("./postModel");
db.comment = require("./commentModel");

module.exports = db;
