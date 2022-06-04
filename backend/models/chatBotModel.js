const { Schema, model } = require("mongoose");

const ChatBotSchema = new Schema({
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

module.exports = model("Chatbot", ChatBotSchema);
