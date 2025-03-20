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
  return await User.findByIdAndUpdate(
    userId,
    {
      friends: [...prevFriendsIds, friendId],
    },
    { new: true }
  ).select("-password");
};
const deleteFriend = async (userId, friendId) => {
  const { friends: allFriends } = await User.findById(userId);
  const filteredFriends = allFriends.filter((friend) => friend !== friendId);
  return await User.findByIdAndUpdate(
    userId,
    {
      friends: [...filteredFriends],
    },
    { new: true }
  ).select("-password");
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
