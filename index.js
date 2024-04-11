const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi"); // for input validation
const productSchema = require("./models/productSchema");
const Product = require("productModel");

const app = express();
const port = process.env.PORT;
const url = process.env.URL;

app.use(express.json());

// Connecting to MongoDB
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Middleware to validate product schema
const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// API to GET all products
app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find(); // Fetching all products
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// API to GET a product by ID
app.get("/products/:id", async (req, res, next) => {
  try {
    const productId = req.params.id; // product ID from the request params

    // find first instance of product
    const product = await Product.findOne({ ID: productId });

    // if product is not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// API to POST a new product
app.post("/products", validateProduct, async (req, res, next) => {
  try {
    const { name, ID } = req.body;

    // Check if a product with the same ID already exists in the database
    const existingProduct = await Product.findOne({ ID });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with the same ID already exists" });
    }

    // if no product with the same ID exists, proceed to create the product
    const product = await Product.create({ name, ID });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// API to DELETE a product by ID
app.delete("/products/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Deleting the product by finding it with the ID and then deleting it
    // Note, product also contains the deleted document
    const product = await Product.findOneAndDelete({ ID: productId });

    // If product not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// Update an existing product by ID
app.put("/products/:id", validateProduct, async (req, res, next) => {
  try {
    const productId = req.params.id; // ID from request params, to be updated
    const updatedProduct = req.body; // Updated data

    // Proceed to update the product
    const product = await Product.findOneAndUpdate(
      { ID: productId }, // Query based on the ID field instead of _id
      updatedProduct,
      { new: true } // Returning the updated product
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" }); // If product not found, return a 404 error
    }

    res.json(product); // Sending the updated product as a JSON response
  } catch (error) {
    next(error); // Passing the error to the error handling middleware
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
