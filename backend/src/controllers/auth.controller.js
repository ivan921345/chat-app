const crtlWrapper = require("../helpers/ctrlWrapper.helper");
const User = require("../models/user.model");
const httpError = require("../helpers/httpError.helper");
const bcryptjs = require("bcryptjs");
const userServices = require("../services/user.service");
const createJwt = require("../helpers/createJwt");
const cloudinary = require("../services/cloudinary.service");

const signup = async (req, res) => {
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

  const token = createJwt({ id: newUser._id });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.status(201).json({
    message: "Created new user",
    data: {
      email,
      fullName,
      profilePic: newUser.profilePic,
    },
  });
};

const login = async (req, res, _) => {
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

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.status(200).json({
    message: "Login success",
    data: {
      email: user.email,
      fullName: user.fullName,
    },
  });
};

const logout = (_, res, __) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({
    message: "logout successfully",
  });
};

const updateProfile = async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    throw httpError(400, "Bad Request");
  }
  const cloudinaryResp = await cloudinary.uploader.upload(profilePic);
  const updatedUser = await userServices.changeUser(userId, {
    profilePic: cloudinaryResp.secure_url,
  });

  res.status(200).json(updatedUser);
};

const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  signup: crtlWrapper(signup),
  login: crtlWrapper(login),
  logout: crtlWrapper(logout),
  updateProfile: crtlWrapper(updateProfile),
  checkAuth: crtlWrapper(checkAuth),
};
