import crypto from "crypto";
import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d",
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        firebaseUid: user.firebaseUid,
        avatar: user.avatar,
        emailVerified: user.emailVerified,
      },
    });
};

// @desc    Register admin with secret key
// @route   POST /api/auth/admin-register
// @access  Public (requires secret key)
export const registerAdmin = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    adminKey,
    firebaseUid,
    displayName,
    photoURL,
  } = req.body;

  // Validate admin secret key
  const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
  if (!ADMIN_SECRET_KEY) {
    return res.status(500).json({
      success: false,
      message: "Admin registration is not configured",
    });
  }
  if (adminKey !== ADMIN_SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid admin secret key",
    });
  }

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and password",
    });
  }

  // Password validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  // Check if user exists - if so, upgrade to admin
  console.log("Looking for existing user with email:", email);
  const existingUser = await User.findOne({ email });
  console.log("Existing user found:", existingUser ? "Yes" : "No");
  let user;

  if (existingUser) {
    // Upgrade existing user to admin
    console.log("Upgrading existing user to admin...");
    existingUser.role = "admin";
    if (name) existingUser.name = name;
    if (firebaseUid) existingUser.firebaseUid = firebaseUid;
    if (photoURL) existingUser.avatar = photoURL;
    user = await existingUser.save({ validateBeforeSave: false });
    console.log("User upgraded successfully:", user._id);
  } else {
    // Create new admin user
    console.log("Creating new admin user...");
    const userData = {
      name,
      email,
      password,
      role: "admin",
      firebaseUid: firebaseUid || undefined,
      avatar: photoURL || "",
    };
    console.log("User data prepared:", { ...userData, password: "***" });

    try {
      user = await User.create(userData);
      console.log("New user created with ID:", user._id);

      // Generate email verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");
      user.emailVerificationToken = verificationToken;
      await user.save({ validateBeforeSave: false });
      console.log("Verification token saved");
    } catch (dbError) {
      console.error("Database error creating user:", dbError.message);
      throw dbError;
    }
  }

  console.log("Admin registration complete, sending response...");
  // Return token response for immediate login after registration
  sendTokenResponse(user, 201, res, "Admin registered successfully");
});
