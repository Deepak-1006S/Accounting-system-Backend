const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users.model");
const { sendErrorResponse, sendSuccessResponse } = require("../utils/helpers");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    // Check if a user with the provided email already exists
    let user = await usersModel.findOne({ email });
    if (user) {
      return sendErrorResponse(
        res,
        "Failed",
        "User with this email already exists",
        400
      );
    }

    user = new usersModel({ username, password, email });

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Create a JWT payload with the user's ID
    const payload = { user: { id: user._id } };
    const jwtSecret = process.env.jwtSecret;
    if (!jwtSecret) {
      console.error("JWT secret is not set in environment");
      return sendErrorResponse(
        res,
        "Server configuration error",
        "JWT secret not configured",
        500
      );
    }

    jwt.sign(payload, jwtSecret, (err, token) => {
      if (err) {
        console.error("JWT sign error:", err);
        return sendErrorResponse(res, "Internal server error", err, 500);
      }
      sendSuccessResponse(res, "success", token);
    });
  } catch (error) {
    return sendErrorResponse(res, "Internal server error", error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if a user with the provided email exists
    let user = await usersModel.findOne({ email });

    if (!user) {
      return sendErrorResponse(res, "Failed", "Invalid Credentials", 400);
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return sendErrorResponse(res, "Failed", "Invalid Credentials", 400);
    }

    // Create a JWT payload with the user's ID
    const payload = { user: { id: user._id } };
    const jwtSecret = process.env.jwtSecret;
    if (!jwtSecret) {
      console.error("JWT secret is not set in environment");
      return sendErrorResponse(
        res,
        "Server configuration error",
        "JWT secret not configured",
        500
      );
    }

    // Sign the JWT token and send it in the response
    jwt.sign(payload, jwtSecret, (err, token) => {
      if (err) {
        console.error("JWT sign error:", err);
        return sendErrorResponse(res, "Internal server error", err, 500);
      }
      sendSuccessResponse(res, "success", token);
    });
  } catch (error) {
    return sendErrorResponse(res, "Internal server error", error);
  }
};
