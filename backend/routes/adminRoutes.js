var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");

/* GET home page. */
router.post("/allusers", adminController.allUsers);

module.exports = router;
