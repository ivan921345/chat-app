const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const messageCrtls = require("../controllers/message.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, //10MB
});

const messageRouter = express.Router();

messageRouter.get("/users", authenticate, messageCrtls.getUsersForSidebar);
messageRouter.get("/:id", authenticate, messageCrtls.getMessages);
messageRouter.post(
  "/send/:id",
  authenticate,
  upload.single("image"),
  messageCrtls.sendMessages
);
messageRouter.delete("/delete/:id", authenticate, messageCrtls.deleteMessage);
module.exports = messageRouter;
