const ctrlWrapper = require("../helpers/ctrlWrapper.helper");
const userServices = require("../services/user.service");
const httpError = require("../helpers/httpError.helper");

const getFriends = async (req, res) => {
  const user = req.user;
  p;
  const allFriends = await userServices.getAllFriends(user._id);
  res.status(200).json(allFriends);
};

const addFriend = async (req, res) => {
  const user = req.user;
  const { friendId } = req.body;

  if (user._id.toString() === friendId.toString()) {
    throw httpError(400, "You can not use your own ID");
  }
  const arrayOfFriends = await userServices.addFriend(user._id, friendId);
  res.status(201).json(arrayOfFriends);
};

const deleteFriend = async (req, res) => {
  const user = req.user;
  const { friendId } = req.body;
  const arrayOfFriends = await userServices.deleteFriend(user._id, friendId);
  res.status(200).json(arrayOfFriends);
};

module.exports = {
  getFriends: ctrlWrapper(getFriends),
  addFriend: ctrlWrapper(addFriend),
  deleteFriend: ctrlWrapper(deleteFriend),
};
