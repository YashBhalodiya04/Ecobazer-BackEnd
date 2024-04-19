const User = require("../models/User");
const Product = require("../models/Product");
const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userAuthId).populate({
      path: "cart",
      populate: {
        path: "productId",
        model: "Product",
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      status: "success",
      message: "User cart fetched",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;

    if (!productId) {
      throw new Error("Product Id is required");
    }
    if (!quantity) {
      throw new Error("Quantity is required");
    }
    if (!price) {
      throw new Error("Price is required");
    }

    const user = await User.findById(req.userAuthId);
    if (!user) {
      throw new Error("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const productExist = user.cart.find((item) => {
      return item.productId.toString() === productId.toString();
    });

    if (productExist) {
      throw new Error("Product already exist in cart");
    }

    user.cart.push({
      productId: productId,
      quantity: quantity,
      price: price,
    });

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Product added to cart",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateCart = asyncHandler(async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req?.params?.id;

    if (!itemId) {
      throw new Error("Item Id is required");
    }
    if (!quantity) {
      throw new Error("Quantity is required");
    }

    const user = await User.findById(req.userAuthId);
    if (!user) {
      throw new Error("User not found");
    }

    const itemIndex = user.cart.findIndex(
      (item) => item._id.toString() === itemId.toString()
    );
    if (itemIndex === -1) {
      throw new Error("Item not found in cart");
    }

    user.cart[itemIndex].quantity = quantity;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Product updated in cart",
      user,
    });
  } catch (error) {
    console.error("Error in updateCart:", error);
    throw new Error(error);
  }
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  try {
    const itemId = req?.params?.id;
    if (!itemId) {
      throw new Error("Item Id is required");
    }

    const user = await User.findById(req.userAuthId);
    if (!user) {
      throw new Error("User not found");
    }

    const itemExist = user.cart.find((item) => {
      return item._id.toString() === itemId.toString();
    });

    if (!itemExist) {
      throw new Error("Item not found in cart");
    }

    await User.updateOne(
      { _id: req.userAuthId },
      { $pull: { cart: { _id: itemId } } }
    );

    res.status(200).json({
      status: "success",
      message: "Product removed from cart",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { getCart, addToCart, updateCart, removeItemFromCart };
