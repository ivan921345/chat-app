const httpError = require("../helpers/httpError.helper");
const User = require("../models/user.model");
const mapFriendsArray = require("../helpers/mapArrayOfFriends");
const mongoose = require("mongoose");
const getAllUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const changeUser = async (id, body) => {
  return await User.findByIdAndUpdate(id, body, { new: true });
};

const addUser = async (body) => {
  return await User.create(body);
};

const getAllFriends = async (userId) => {
  const { friends } = await User.findById(userId);

  return await mapFriendsArray(friends);
};

const addFriend = async (userId, friendId) => {
  const { friends: prevFriendsIds } = await User.findById(userId);
  const friendToAdd = await User.findById(friendId);

  if (!friendToAdd) {
    throw httpError(404, `No user with id of ${friendId} has been found`);
  }
  if (prevFriendsIds.includes(friendToAdd._id)) {
    return await mapFriendsArray(prevFriendsIds);
  }
  if (!friendToAdd.friends.includes(userId)) {
    await User.findByIdAndUpdate(friendId, {
      friends: [...friendToAdd.friends, userId],
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      friends: [...prevFriendsIds, friendId],
    },
    { new: true }
  ).select("-password");

  return await mapFriendsArray(updatedUser.friends);
};
const deleteFriend = async (userId, friendId) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { friends: friendId } },
    { new: true, returnDocument: "after" }
  ).select("-password");

  await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

  return await mapFriendsArray(updatedUser.friends);
};

const searchFriend = async (credentials) => {
  const query = {
    $or: [{ email: credentials }, { fullName: credentials }],
  };

  if (mongoose.Types.ObjectId.isValid(credentials)) {
    query.$or.push({ _id: new mongoose.Types.ObjectId(credentials) });
  }

  const user = await User.find(query);
  return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByEmail,
  deleteUser,
  changeUser,
  addUser,
  addFriend,
  deleteFriend,
  getAllFriends,
  searchFriend,
};
