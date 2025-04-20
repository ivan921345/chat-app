const mongoose = require("mongoose");

const group = new mongoose.Schema({
  users: {
    type: Array,
    required: true,
  },
  messages: {
    type: Array,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Group = mongoose.model("Group", group);

module.exports = Group;
