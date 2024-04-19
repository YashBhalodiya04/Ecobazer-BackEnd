const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const createProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, category, stock, price } = req.body;

  const image = req?.files[0]?.path;

  if (!image) {
    return res.status(400).json({ error: "Please upload an image" });
  }

  if (!name || !description || !category || !stock || !price) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  const productExist = await Product.findOne({ name });

  if (productExist) {
    return res
      .status(400)
      .json({ error: "Sorry a product with this name already exists" });
  }

  const categoryExist = await Category.findOne({ name: category });
  if (!categoryExist) {
    return res
      .status(400)
      .json({ error: "Sorry a category with this name already exists" });
  }

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    user: req.userAuthId,
    stock,
    image,
  });

  const productCreated = await newProduct.save();

  categoryExist.products.push(productCreated._id);
  await categoryExist.save();
  res.status(201).json({
    status: "success",
    data: productCreated,
  });
});

const getallProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    throw new Error("Product Not Found");
  }
  res.status(200).json({
    status: "success",
    data: products,
  });
});

const SingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error("Product not found");
  }
  res.status(200).json({
    status: "success",
    data: product,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new Error("Product not found");
  } else {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, category, stock, price } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error("Product Id not found");
  }

  const image = req?.file ? req.file.path : product.image;

  const productUpdated = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      category,
      user: req.userAuthId,
      stock,
      image: image,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: productUpdated,
  });
});

module.exports = {
  createProduct,
  getallProducts,
  deleteProduct,
  updateProduct,
  SingleProduct,
};
