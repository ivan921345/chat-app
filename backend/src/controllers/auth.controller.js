const crtlWrapper = require("../helpers/ctrlWrapper.helper");
const User = require("../models/user.model");
const httpError = require("../helpers/httpError.helper");
const bcryptjs = require("bcryptjs");
const userServices = require("../services/user.service");
const createJwt = require("../helpers/createJwt");
const cloudinary = require("../services/cloudinary.service");

const signup = async (req, res, next) => {
  const { email, password, fullName } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Unique email conflict");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = await userServices.addUser({
    ...req.body,
    password: hashedPassword,
  });
  console.log(newUser);

  const token = createJwt({ id: newUser._id });

  res.status(201).json({
    message: "Created new user",
    data: {
      email,
      fullName,
      profilePic: newUser.profilePic,
      id: newUser._id,
      token,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userServices.getUserByEmail(email);

  if (!user) {
    throw httpError(401, "Wrong email or password");
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw httpError(401, "Wrong email or password");
  }

  const token = createJwt({ id: user._id });

  res.status(200).json({
    message: "Login success",
    data: {
      email: user.email,
      fullName: user.fullName,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      id: user._id,
      token,
    },
  });
};

const logout = (_, res, next) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({
    message: "logout successfully",
  });
};

const updateProfile = async (req, res, next) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    throw httpError(400, "Bad Request");
  }
  const cloudinaryResp = await cloudinary.uploader.upload(profilePic);
  const updatedUser = await userServices.changeUser(userId, {
    profilePic: cloudinaryResp.secure_url,
  });

  res.status(200).json({
    fullName: updatedUser.fullName,
    email: updatedUser.email,
    profilePic: updatedUser.profilePic,
    createdAt: updatedUser.createdAt,
    id: userId,
  });
};

const checkAuth = (req, res, next) => {
  const { createdAt } = req.user;
  res.status(200).json({
    fullName: req.user.fullName,
    profilePic: req.user.profilePic,
    email: req.user.email,
    createdAt,
    id: req.user._id,
    friends: req.user.friends,
  });
};

module.exports = {
  signup: crtlWrapper(signup),
  login: crtlWrapper(login),
  logout: crtlWrapper(logout),
  updateProfile: crtlWrapper(updateProfile),
  checkAuth: crtlWrapper(checkAuth),
};
