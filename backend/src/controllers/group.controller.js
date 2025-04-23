const Group = require("../models/group.model");
const User = require("../models/user.model");
const ctrlWrapper = require("../helpers/ctrlWrapper.helper");
const { io, getReceiverSocketId } = require("../socket/socket");

const getAllGroups = async (req, res) => {
  const user = req.user;

  const groups = await Group.find();

  const filteredGroups = groups.filter(({ users }) => {
    return users.some(
      (userToFind) => userToFind._id.toString() === user._id.toString()
    );
  });

  res.status(200).json(filteredGroups);
};

const createGroup = async (req, res) => {
  const user = req.user;
  const { title } = req.body;

  const foundUser = await User.findById(user).select("-password");

  const newGroup = await Group.create({
    users: [foundUser],
    messages: [],
    owner: user._id,
    title,
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

  //searching if group already has user
  const alreadyAddedUser = group.users.find((user) => {
    return user._id.toString() === userToAddId.toString();
  });

  console.log(alreadyAddedUser);

  if (alreadyAddedUser) {
    return res.status(200).json(group);
  }

  const foundUser = await User.findById(userToAddId).select("-password");

  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    {
      users: [...group.users, foundUser],
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

  const includesFriend = group.users.some(
    (user) => user._id.toString() === userToDeleteId.toString()
  );

  if (!includesFriend) {
    return res.status(200).json(group);
  }

  const filteredUsers = group.users.filter(
    (user) => user._id.toString() !== userToDeleteId.toString()
  );

  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    {
      users: [...filteredUsers],
    },
    { new: true }
  );

  if (!userToDeleteSocketId) {
    return res.status(200).json(updatedGroup);
  }

  io.to(userToDeleteId).emit("deleteUser", updatedGroup);
  res.status(200).json(updatedGroup);
};

module.exports = {
  createGroup: ctrlWrapper(createGroup),
  addUser: ctrlWrapper(addUser),
  deleteGroup: ctrlWrapper(deleteGroup),
  deleteUser: ctrlWrapper(deleteUser),
  getAllGroups: ctrlWrapper(getAllGroups),
};
