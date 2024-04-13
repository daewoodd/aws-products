const mongoose = require("mongoose");

// Define the Mongoose schema for the database model
const mongooseProductSchema = new mongoose.Schema({
  name: String,
  ID: String,
});

// Create the Product model based on the Mongoose schema
const Product = mongoose.model("Product", mongooseProductSchema);

// Export both the schema and the model
module.exports = Product;
