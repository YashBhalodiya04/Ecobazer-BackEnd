const jwt = require("jsonwebtoken");
const { tokenVerify } = require("../utils/VarifyToken");

const isLoggedin = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const varify = tokenVerify(token, process.env.JWT_TOKEN);
    if (!varify) {
      throw new Error("Invalid / Expired Token, Please log in again");
    } else {
      req.userAuthId = varify.id;
      next();
    }
  } else {
    res.status(401).json({
      message: "Token Not Found",
    });
  }
};

module.exports = isLoggedin;
