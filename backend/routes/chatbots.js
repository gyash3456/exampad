var express = require("express");
var router = express.Router();
const chatBotModel = require("../models/chatBotModel");

/* GET home page. */
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await chatBotModel.find({ id: req.params.id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await chatBotModel.find().select("-_id -__v");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/post", async (req, res) => {
  const data = new chatBotModel({
    id: req.body.id,
    options: req.body.options,
    message: req.body.message,
    user: req.body.user,
    trigger: req.body.trigger,
    component: req.body.component,
    end: req.body.end,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
