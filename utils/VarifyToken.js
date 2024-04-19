const jwt = require("jsonwebtoken");

const tokenVerify = (token, secret) => {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = { tokenVerify };
