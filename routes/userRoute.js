const express = require("express");
const {
  createUser,
  userLogin,
  userProfile,
  updateBillingAddress,
  UpdatePassword,
  updateProfile,
} = require("../Controllers/userController");
const isLoggedin = require("../middlewares/isLoggedin");
const uploadprofileImage = require("../Configs/UserImageUpload");

const userRoutes = express.Router();

userRoutes.post("/createuser", createUser);
userRoutes.post("/userlogin", userLogin);
userRoutes.get("/profile", isLoggedin, userProfile);
userRoutes.put("/updateaddress", isLoggedin, updateBillingAddress);
userRoutes.put("/updatepassword", isLoggedin, UpdatePassword);
userRoutes.put(
  "/updateprofile",
  isLoggedin,
  uploadprofileImage.single("userimage"),
  updateProfile
);

module.exports = userRoutes;
