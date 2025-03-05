const crtlWrapper = require("../middlewares/ctrlWrapper.middleware");

const signup = (req, res, next) => {};

const login = (req, res, next) => {};

const logout = (req, res, next) => {};

module.exports = {
  signup: crtlWrapper(signup),
  login: crtlWrapper(login),
  logout: crtlWrapper(logout),
};
