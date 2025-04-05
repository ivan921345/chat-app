const crtlWrapper = require("../helpers/ctrlWrapper.helper");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const cloudinary = require("../services/cloudinary.service");
const { getReceiverSocketId, io } = require("../socket/socket");
const streamUpload = require("../helpers/uploadStream.helper");

const getUsersForSidebar = async (req, res) => {
  const loggedInUserId = req.user._id;
  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");

  if (filteredUsers) {
    return res.status(200).json({
      data: filteredUsers,
    });
  }
  res.status(200).json({
    data: [],
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
    data: messages,
  });
};

const saveMessage = async (senderId, recieverId, text, imgUrl, res) => {
  const newMessage = new Message({
    senderId,
    recieverId,
    text,
    image: imgUrl,
  });

  await newMessage.save();
  const receiverSocketId = getReceiverSocketId(recieverId);

  if (!receiverSocketId) {
    res.status(201).json(newMessage);
    return;
  }

  io.to(receiverSocketId).emit("sendMessage", newMessage);

  res.status(201).json(newMessage);
};

const sendMessages = async (req, res) => {
  const { text } = req.body;
  const recieverId = req.params.id;
  const senderId = req.user._id;

  if (req.file) {
    const { secure_url } = await streamUpload(req.file.buffer);
    saveMessage(senderId, recieverId, text, secure_url, res);
  } else {
    saveMessage(senderId, recieverId, text, "", res);
  }
};

const deleteMessage = async (req, res) => {
  const messageToDeleteId = req.params.id;
  const messageToDelete = await Message.findById(messageToDeleteId);
  const receiverSocketId = getReceiverSocketId(messageToDelete.recieverId);
  console.log(receiverSocketId);
  if (!messageToDelete) {
    return res.status(404).json({
      message: "Message not found",
    });
  }
  const deletedMessage = await Message.findByIdAndDelete(messageToDeleteId, {
    new: true,
  });

  io.to(receiverSocketId).emit("deleteMessage", deletedMessage);

  res.status(200).json(deletedMessage);
};

module.exports = {
  getUsersForSidebar: crtlWrapper(getUsersForSidebar),
  getMessages: crtlWrapper(getMessages),
  sendMessages: crtlWrapper(sendMessages),
  deleteMessage: crtlWrapper(deleteMessage),
};
