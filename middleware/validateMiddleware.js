// validationMiddleware.js

const productSchema = require("./schemas/productSchema");

const validateProduct = (req, res, next) => {
  const { error, value } = Schema.validate(req.body);

  // If validation fails, return a 400 Bad Request response with the error details
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error,
    });
  }

  // If validation succeeds, call the next middleware function
  next();
};

module.exports = {
  validateProduct,
};
