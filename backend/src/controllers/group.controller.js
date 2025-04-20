const Group = require("../models/group.model");
const User = require("../models/user.model");
const ctrlWrapper = require("../helpers/ctrlWrapper.helper");
const { io, getReceiverSocketId } = require("../socket/socket");

const createGroup = async (req, res) => {
  const user = req.user;

  const newGroup = await Group.create({
    users: [user._id],
    messages: [],
    owner: user._id,
  });

  res.status(201).json(newGroup);
};

const deleteGroup = async (req, res) => {
  const { groupId } = req.params;
  const user = req.user;
  const group = await Group.findById(groupId);
  if (!group) {
    res.status(400).json({
      message: "No group found",
    });
  }

  console.log("groupId: ", group);
  if (user._id.toString() !== group.owner.toString()) {
    return res.status(401).json({
      message: "You dont have permitions to delete this conversation",
    });
  }

  await Group.findByIdAndDelete(groupId);

  res.status(200).json({
    message: "Group deleted",
  });
};

const addUser = async (req, res) => {
  const user = req.user;
  const { userToAddId, groupId } = req.body;
  const group = await Group.findById(groupId);

  if (user._id.toString() !== group.owner.toString()) {
    res.status(401).json({
      message: "You dont have permitions to add users",
    });
  }

  const userToAddSocketId = getReceiverSocketId(userToAddId);

  if (group.users.includes(userToAddId)) {
    return res.status(200).json(group);
  }

  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    {
      users: [...group.users, userToAddId],
    },
    { new: true }
  );

  if (!userToAddSocketId) {
    return res.status(200).json(updatedGroup);
  }

  io.to(userToAddSocketId).emit("addUser", updatedGroup);
  res.status(200).json(updatedGroup);
};

const deleteUser = async (req, res) => {
  const user = req.user;
  const { userToDeleteId, groupId } = req.body;
  const group = await Group.findById(groupId);
  const userToDeleteSocketId = getReceiverSocketId(userToDeleteId);

  if (user._id.toString() !== group.owner.toString()) {
    res.status(401).json({
      message: "You dont have permitions to add users",
    });
  }

  if (!group.users.includes(userToDeleteId)) {
    return res.status(200).json(group);
  }

  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    {
      $pull: { users: userToDeleteId },
    },
    { new: true }
  );

  if (!userToDeleteSocketId) {
    return res.status(200).json(updatedGroup);
  }

  io.to(userToDeleteId).emit("deleteUser");
};

module.exports = {
  createGroup: ctrlWrapper(createGroup),
  addUser: ctrlWrapper(addUser),
  deleteGroup: ctrlWrapper(deleteGroup),
  deleteUser: ctrlWrapper(deleteUser),
};
