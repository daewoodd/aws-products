/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * @module db
 */

const mongoose = require("mongoose");
require("dotenv").config();
const db_url = process.env.DB_URL;

/**
 * Connects to the MongoDB database.
 * @function
 * @returns {Promise} A promise that resolves when the database connection is successful, or rejects with an error if the connection fails.
 */
mongoose
  .connect(db_url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
