const express = require("express");

const {
  allProducts,
  productById,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("./productController/productController");

const { validateProduct } = require("./middleware/validateMiddleware");

const routes = express.Router();

// API to GET all products
routes.get("/products", allProducts);

// API to GET a product by ID
routes.get("/products/:id", productById);

// API to POST a new product
routes.post("/products", validateProduct, addProduct);

// API to DELETE a product by ID
routes.delete("/products/:id", deleteProduct);

// Update an existing product by ID
routes.put("/products/:id", validateProduct, updateProduct);

module.exports = routes;
