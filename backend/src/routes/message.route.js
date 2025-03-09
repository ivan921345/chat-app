const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const messageCrtls = require("../controllers/message.controller");

const messageRouter = express.Router();

messageRouter.get("/users", authenticate, messageCrtls.getUsersForSidebar);
messageRouter.get("/:id", authenticate, messageCrtls.getMessages);
messageRouter.post("/send/:id");
module.exports = messageRouter;
