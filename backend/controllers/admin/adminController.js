const User = require("../../models/userModel");
const paginate = require("express-paginate");
const { getUserIdByToken } = require("../../helpers/auth");

const getAll = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      User.find({})
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      User.count({}),
    ]);
    const pageCount = Math.ceil(itemCount / req.query.limit);
    return res.status(201).json({
      object: "list",
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const item = await User.findById(req.params.id);
    if (item) {
      return res.status(200).json(item);
    }
    return res.status(404).json({
      message: "Item not found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const getLoggedInUser = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    var token = req.headers.authorization.split(" ")[1],
      decoded;
    try {
      decoded = getUserIdByToken(token);
    } catch (e) {
      return res.status(401).send("unauthorized");
    }
    var userId = decoded.user_id;

    try {
      const item = await User.findById(userId, {
        _id: 0,
        email: 1,
        firstName: 1,
        image: 1,
        lastName: 1,
      });
      if (item) {
        return res.status(200).json(item);
      }
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    }
  }
};

module.exports = {
  getAll,
  getOne,
  getLoggedInUser,
};
