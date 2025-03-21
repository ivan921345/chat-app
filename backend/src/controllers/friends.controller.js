const ctrlWrapper = require("../helpers/ctrlWrapper.helper");
const userServices = require("../services/user.service");

const getFriends = async (req, res) => {
  const user = req.user;
  const allFriends = await userServices.getAllFriends(user._id);
  res.status(200).json(allFriends);
};

const addFriend = async (req, res) => {
  const user = req.user;
  const { friendId } = req.body;
  if (user.friends.includes(friendId)) {
    return res.status(200).json(user);
  }
  if (user._id === friendId) {
    return res.status(400).json({
      message: "You can not ue your ID",
    });
  }
  const updatedUser = await userServices.addFriend(user._id, friendId);
  res.status(201).json(updatedUser);
};

const deleteFriend = async (req, res) => {
  const user = req.user;
  const { friendId } = req.body;
  const updatedUser = await userServices.deleteFriend(user._id, friendId);
  res.status(200).json(updatedUser);
};

module.exports = {
  getFriends: ctrlWrapper(getFriends),
  addFriend: ctrlWrapper(addFriend),
  deleteFriend: ctrlWrapper(deleteFriend),
};
