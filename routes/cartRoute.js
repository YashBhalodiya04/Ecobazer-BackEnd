const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const {
  getCart,
  addToCart,
  updateCart,
  removeItemFromCart,
} = require("../Controllers/cartController");

const cartRoute = express.Router();

cartRoute.get("/getcart", isLoggedin, getCart);
cartRoute.post("/addtocart", isLoggedin, addToCart);

cartRoute.put("/updatecart/:id", isLoggedin, updateCart);

cartRoute.delete("/removeitem/:id", isLoggedin, removeItemFromCart);

module.exports = cartRoute;
