const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user");
db.role = require("./role");
db.refreshToken = require("./refreshToken");

db.chatBot = require("./chatBot");

// Blog Models
db.category = require("./category");
db.post = require("./post");
db.comment = require("./comment");

module.exports = db;
