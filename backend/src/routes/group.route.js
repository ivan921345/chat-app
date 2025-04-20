const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const groupCtrls = require("../controllers/group.controller");
const groupRouter = express.Router();

groupRouter.post("/create", authenticate, groupCtrls.createGroup);

groupRouter.delete("/delete/:groupId", authenticate, groupCtrls.deleteGroup);

groupRouter.post("/add", authenticate, groupCtrls.addUser);

groupRouter.delete("/delete-user", authenticate, groupCtrls.deleteUser);

module.exports = groupRouter;
