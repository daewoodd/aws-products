const Joi = require("joi");

// Define the Joi schema for product validation
const productSchema = Joi.object({
  name: Joi.string().required(),
  ID: Joi.string().required(),
});

module.exports = productSchema;
// Path: Middleware/validateMiddleware.js
