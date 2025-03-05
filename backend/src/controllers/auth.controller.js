const crtlWrapper = require("../helpers/ctrlWrapper.helper");
const User = require("../models/user.model");
const httpError = require("../helpers/httpError.helper");
const bcryptjs = require("bcryptjs");
const userServices = require("../services/user.service");
const createJwt = require("../helpers/createJwt");

const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: "Unique email conflict",
    });
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

const login = (req, res, next) => {};

const logout = (req, res, next) => {};

module.exports = {
  signup: crtlWrapper(signup),
  login: crtlWrapper(login),
  logout: crtlWrapper(logout),
};
