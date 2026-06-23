// Load environment variables from a .env file into process.env
require("dotenv").config();
const mongooseConnection = require("./db");
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
mongooseConnection();
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware for parsing incoming requests with URL-encoded payloads
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for parsing incoming requests with JSON payloads
// parse application/json
app.use(bodyParser.json());

// Middleware for enabling Cross-Origin Resource Sharing (CORS)

const allowedOrigins = [
  "https://accounting-system-frontend-six.vercel.app",
  "http://localhost:3000",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Import and use the router for handling different endpoints
const router = require("./routes");
app.use("/", router);

// Start the Express server and listen for incoming requests on the defined port
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
