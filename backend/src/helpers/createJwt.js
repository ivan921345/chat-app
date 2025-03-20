const jwt = require("jsonwebtoken");
require("dotenv").config();

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = createJWT;
