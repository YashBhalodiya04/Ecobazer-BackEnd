const express = require("express");
const {
  createUser,
  userLogin,
  userProfile,
  updateBillingAddress,
} = require("../Controllers/userController");
const isLoggedin = require("../middlewares/isLoggedin");

const userRoutes = express.Router();

userRoutes.post("/createuser", createUser);
userRoutes.post("/userlogin", userLogin);
userRoutes.get("/profile", isLoggedin, userProfile);
userRoutes.put("/updateaddress", isLoggedin, updateBillingAddress);

module.exports = userRoutes;
