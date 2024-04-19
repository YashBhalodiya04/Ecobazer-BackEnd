const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../Configs/ImageUpload");
const {
  createProduct,
  getallProducts,
  deleteProduct,
  updateProduct,
  SingleProduct,
} = require("../Controllers/productController");

const productRoutes = express.Router();

productRoutes.post(
  "/createproduct",
  isLoggedin,
  isAdmin,
  upload.array("image"),
  createProduct
);
productRoutes.put(
  "/:id",
  isLoggedin,
  isAdmin,
  upload.array("image"),
  updateProduct
);

productRoutes.get("/getallproduct", getallProducts);
productRoutes.get("/getsingleproduct/:id", SingleProduct);
productRoutes.delete("/:id", isLoggedin, isAdmin, deleteProduct);

module.exports = productRoutes;
