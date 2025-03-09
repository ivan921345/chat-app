const crtlWrapper = require("../helpers/ctrlWrapper.helper");
const httpError = require("../helpers/httpError.helper");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const { text } = require("express");
const cloudinary = require("../services/cloudinary.service");

const getUsersForSidebar = async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");

  res.status(200).json({
    data: filteredUsers,
  });
};

const getMessages = async (req, res) => {
  const userToChat = req.params.id;
  const senderId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: senderId, recieverId: userToChat },
      { senderId: userToChat, recieverId: senderId },
    ],
  });
  if (!messages) {
    res.status(200).json({
      data: [],
      message: "you dont have any massages",
    });
  }

  res.status(200).json({
    messages,
  });
};

const sendMessages = async (req, res) => {
  const { text, image } = req.body;
  const recieverId = req.params.id;
  const senderId = req.user._id;

  let imgUrl;
  if (image) {
    const uploadRes = await cloudinary.uploader.upload(image);
    imgUrl = uploadRes.secure_url;
  }

  const newMesssage = new Message({
    senderId,
    recieverId,
    text,
    imgUrl,
  });

  await newMesssage.save();

  // todo: realtime func

  res.status(201).json({ newMesssage });
};

module.exports = {
  getUsersForSidebar: crtlWrapper(getUsersForSidebar),
  getMessages: crtlWrapper(getMessages),
  sendMessages: crtlWrapper(sendMessages),
};
