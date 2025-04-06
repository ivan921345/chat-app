const { Schema, model } = require("mongoose");

const message = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requireed: true,
    },
    recieverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    voiceMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = model("Message", message);

module.exports = Message;
