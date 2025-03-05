const jwt = require("jsonwebtoken");

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = createJWT;
