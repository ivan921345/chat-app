const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const authenticate = require("../middlewares/authenticate.middleware");

const authRoutes = express.Router();

authRoutes.post("/signup", authCtrl.signup);

authRoutes.post("/login", authCtrl.login);

authRoutes.post("/logout", authenticate, authCtrl.logout);

authRoutes.put("/update-profile", authenticate, authCtrl.updateProfile);

authRoutes.get("/check", authenticate, authCtrl.checkAuth);

module.exports = authRoutes;
