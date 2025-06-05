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
  console.log(title);
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
  const { groupId } = req.body;
  const user = req.user;
  const group = await Group.findById(groupId);
  if (!group) {
    res.status(400).json({
      message: "No group found",
    });
  }

  if (user._id.toString() !== group.owner.toString()) {
    return res.status(401).json({
      message: "You dont have permitions to delete this conversation",
    });
  }

  const deletedGroup = await Group.findByIdAndDelete(groupId);

  res.status(200).json(deletedGroup);
};

const addUser = async (req, res) => {
  const user = req.user;
  const { userToAddId, groupId } = req.body;
  const group = await Group.findById(groupId);

  if (user._id.toString() !== group.owner.toString()) {
    return res.status(401).json({
      message: "You dont have permitions to add users",
    });
  }

  const userToAddSocketId = getReceiverSocketId(userToAddId);

  //searching if group already has user
  const alreadyAddedUser = group.users.find((user) => {
    return user._id.toString() === userToAddId.toString();
  });

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

  const socketIds = updatedGroup.users
    .map((user) => {
      return getReceiverSocketId(user._id);
    })
    .filter((id) => id !== undefined);

  console.log("socketIds: ", socketIds);

  if (!userToAddSocketId) {
    return res.status(200).json(updatedGroup);
  }

  socketIds.map((userId) => {
    io.to(userId).emit("addUser", updatedGroup);
  });
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

  const socketIds = updatedGroup.users
    .map((user) => {
      return getReceiverSocketId(user._id);
    })
    .filter((id) => id !== undefined);

  if (!userToDeleteSocketId) {
    return res.status(200).json(updatedGroup);
  }

  socketIds.map((userId) => {
    io.to(userId).emit("deleteUser", updatedGroup);
    io.to(userToDeleteSocketId).emit("deleteUser", updatedGroup);
  });
};

module.exports = {
  createGroup: ctrlWrapper(createGroup),
  addUser: ctrlWrapper(addUser),
  deleteGroup: ctrlWrapper(deleteGroup),
  deleteUser: ctrlWrapper(deleteUser),
  getAllGroups: ctrlWrapper(getAllGroups),
};
