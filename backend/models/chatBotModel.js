const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatBotSchema = new Schema({
  id: String,
  message: String,
  component: String,
  options: [
    {
      value: String,
      label: String,
      trigger: String,
    },
  ],
  user: Boolean,
  end: Boolean,
  trigger: String,
});

var chatBotModel = mongoose.model("chatbots", chatBotSchema);

module.exports = chatBotModel;
