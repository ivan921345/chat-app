const express = require("express");
const authCtrl = require("../controllers/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/signup", authCtrl.signup);

authRoutes.post("/login", authCtrl.login);

authRoutes.post("/logout", authCtrl.logout);

module.exports = authRoutes;
