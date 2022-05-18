const db = require("../models");
const { user: User } = db;

exports.allUsers = async (req, res) => {
  User.aggregate([
    { $unset: ["password"] },
    {
      $lookup: {
        from: "roles",
        localField: "roles",
        foreignField: "_id",
        as: "roles",
      },
    },
  ]).exec((err, result) => {
    if (err) {
      console.log("error", err);
    }
    if (result) {
      res.send(result);
    }
  });
};
