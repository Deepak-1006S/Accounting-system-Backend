const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("../utils/helpers");

// Middleware function to authenticate a user based on JWT token
module.exports = function (req, res, next) {
  // Get token from the request header
  const token = req.header("x-auth-token");

  // Check if no token is provided
  if (!token) {
    return sendErrorResponse(res, "No token! Access denied");
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.jwtSecret);

    // Attach the decoded user information to the request object
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("[AUTH_MIDDLEWARE]", error);
    return sendErrorResponse(res, "Token is not valid", error);
  }
};
