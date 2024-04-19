const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const isAdmin = require("../middlewares/isAdmin");
const uploadCategoryImage = require("../Configs/CategoryImageUpload");
const {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} = require("../Controllers/categoryController");

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/createcategory",
  isLoggedin,
  isAdmin,
  uploadCategoryImage.single("image"),
  createCategory
);
categoryRoutes.get("/getallcategory", getAllCategories);
categoryRoutes.put(
  "/:id",
  isLoggedin,
  isAdmin,
  uploadCategoryImage.single("image"),
  updateCategory
);

categoryRoutes.delete("/:id", isLoggedin, isAdmin, deleteCategory);
module.exports = categoryRoutes;
