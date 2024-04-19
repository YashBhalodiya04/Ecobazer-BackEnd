const Category = require("../models/Category");
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

const createCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  // fetch category if exists
  const categoryExist = await Category.findOne({ name });

  // check if category existed or return
  if (categoryExist) {
    throw new Error("Category already exists");
  } else {
    // create category
    const category = await Category.create({
      name: name.toLowerCase(),
      user: req.userAuthId,
      image: req.file.path,
    });

    await category.save();

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      category,
    });
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    status: "success",
    categories,
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.params.id);
  const category = await Category.findById(req.params.id);
  const image = req?.file ? req.file.path : category.image;

  if (!category) {
    throw new Error("Category not found");
  } else {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        image: image,
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      category,
    });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw new Error("Category not found");
  } else {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
