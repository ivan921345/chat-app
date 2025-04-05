const express = require("express");
const authCtrl = require("../controllers/auth.controller");
const authenticate = require("../middlewares/authenticate.middleware");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, //10MB
});
const authRoutes = express.Router();

authRoutes.post("/signup", authCtrl.signup);

authRoutes.post("/login", authCtrl.login);

authRoutes.post("/logout", authenticate, authCtrl.logout);

authRoutes.put(
  "/update-profile",
  upload.single("avatar"),
  authenticate,
  authCtrl.updateProfile
);

authRoutes.get("/check", authenticate, authCtrl.checkAuth);

module.exports = authRoutes;
