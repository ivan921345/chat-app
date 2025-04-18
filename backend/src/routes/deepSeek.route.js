const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const deepSeekCtrls = require("../controllers/deepSeek.controller");
const deepSeekRouter = express.Router();

deepSeekRouter.post("/ask", deepSeekCtrls.ask);

module.exports = deepSeekRouter;
