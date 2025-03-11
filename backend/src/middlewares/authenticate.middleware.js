const jwt = require("jsonwebtoken");
const httpError = require("../helpers/httpError.helper");
const userServices = require("../services/user.service");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw httpError(401, "Unauthorized - No Token Provided");
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userServices.getUserById(id);
    if (!user) {
      throw httpError(404, "No user found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
