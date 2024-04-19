const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const { tokenGenerate } = require("../utils/tokenGenerate");

// @Api "/api/user/createuser"
const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await User.findOne({ email });

    res.status(201).json({
      status: "success",
      msg: "User Registered Successfully",
      userFound: user,
      token: tokenGenerate(savedUser?._id, process.env.JWT_TOKEN, "1d"),
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @API "/api/user/userlogin"
const userLogin = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, userFound?.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Sorry wrong password" });
    }

    if (isMatch) {
      return res.status(200).json({
        status: "success",
        msg: "User Logged in Successfully",
        userFound,
        token: tokenGenerate(userFound?._id, process.env.JWT_TOKEN, "1d"),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error);
  }
});

// @API "/api/user/profile"
const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId);

  // console.log(user);
  res.status(200).json({
    status: "success",
    message: "User profile fetched",
    user,
  });
});

// @API "/api/user/updatebillingaddress"

const updateBillingAddress = asyncHandler(async (req, res) => {
  const userFound = await User.findById(req.userAuthId);

  if (!userFound) {
    throw new Error("User not found");
  }

  const {
    firstname,
    lastname,
    address,
    city,
    pincode,
    country,
    state,
    phone,
    email,
  } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      billingAddress: {
        firstname,
        lastname,
        address,
        city,
        pincode,
        country,
        state,
        phone,
        email,
      },
    },
    {
      new: true,
    }
  ).lean();

  res.status(200).json({
    status: "success",
    message: "User profile fetched",
    user,
  });
});

module.exports = { createUser, userLogin, userProfile, updateBillingAddress };
