const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const friendsControllers = require("../controllers/friends.controller");
const friendsRouter = express.Router();

friendsRouter.get("/", authenticate, friendsControllers.getFriends);
friendsRouter.post("/add", authenticate, friendsControllers.addFriend);
friendsRouter.post("/delete", authenticate, friendsControllers.deleteFriend);

module.exports = friendsRouter;
