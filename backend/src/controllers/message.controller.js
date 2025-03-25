const crtlWrapper = require("../helpers/ctrlWrapper.helper");
const httpError = require("../helpers/httpError.helper");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const cloudinary = require("../services/cloudinary.service");
const { getReceiverSocketId, io } = require("../socket/socket");

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

  res.status(201).json(newMessage);
};

const sendMessages = async (req, res) => {
  const { text } = req.body;
  const recieverId = req.params.id;
  const senderId = req.user._id;

  let imgUrl;
  if (req.file) {
    const uploadRes = await cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) return res.status(500).json({ error });
        imgUrl = result.secure_url;

        saveMessage(senderId, recieverId, text, imgUrl, res);
      })
      .end(req.file.buffer);
  } else {
    saveMessage(senderId, recieverId, text, imgUrl, res);
  }
};

module.exports = {
  getUsersForSidebar: crtlWrapper(getUsersForSidebar),
  getMessages: crtlWrapper(getMessages),
  sendMessages: crtlWrapper(sendMessages),
};
