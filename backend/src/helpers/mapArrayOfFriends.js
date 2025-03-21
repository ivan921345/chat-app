const User = require("../models/user.model");

const mapArrayOfFriends = (friendsArr) => {
  const friendsPromiseArr = friendsArr.map((friend) => {
    return User.findById(friend).select("-password");
  });

  return Promise.all(friendsPromiseArr);
};

module.exports = mapArrayOfFriends;
