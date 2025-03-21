const httpError = require("../helpers/httpError.helper");
const User = require("../models/user.model");

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

  const friendsPromiseArr = friends.map((friend) => {
    return User.findById(friend).select("-password");
  });

  return Promise.all(friendsPromiseArr);
};

const addFriend = async (userId, friendId) => {
  const { friends: prevFriendsIds } = await User.findById(userId);
  const friendToAdd = await User.findById(friendId);

  if (!friendToAdd) {
    throw httpError(404, `No user with id of ${friendId} has been found`);
  }
  if (!friendToAdd.friends.includes(userId)) {
    await User.findByIdAndUpdate(friendId, {
      friends: [...friendToAdd.friends, userId],
    });
  }

  return await User.findByIdAndUpdate(
    userId,
    {
      friends: [...prevFriendsIds, friendId],
    },
    { new: true }
  ).select("-password");
};
const deleteFriend = async (userId, friendId) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { friends: friendId } },
    { new: true, returnDocument: "after" }
  ).select("-password");

  await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

  return updatedUser;
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
};
