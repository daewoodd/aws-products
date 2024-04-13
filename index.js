const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const dotenv = require("dotenv");

/**
 * This is the main entry point of the application.
 * It sets up the Express server, connects to the database,
 * and starts listening on the specified port.
 *
 * @module index
 */

/**
 * Express module
 * @const
 */

/**
 * Body Parser module
 * @const
 */

/**
 * Routes module
 * @const
 */

/**
 * Database connection module
 * @const
 */
require("./db_connection/db_connection.js");

/**
 * Dotenv module
 * @const
 */

/**
 * Express application
 * @const
 */
const app = express();

/**
 * Load environment variables from .env file
 */
dotenv.config();

/**
 * The port on which the server will listen
 * @const {number}
 */
const port = process.env.PORT || 3000;

/**
 * Parse JSON bodies for incoming requests
 */
app.use(bodyParser.json());

/**
 * Mount the routes at the specified path
 */
app.use("/api", routes);

/**
 * Start the server and listen on the specified port
 */
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
