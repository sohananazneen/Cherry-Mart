import crypto from "crypto";
import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import { sendTokenResponse } from "../authUtils.js";

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
  const existingUser = await User.findOne({ email });
  let user;

  if (existingUser) {
    // Upgrade existing user to admin
    existingUser.role = "admin";
    if (name) existingUser.name = name;
    if (firebaseUid) existingUser.firebaseUid = firebaseUid;
    if (photoURL) existingUser.avatar = photoURL;
    user = await existingUser.save({ validateBeforeSave: false });
  } else {
    // Create new admin user
    const userData = {
      name,
      email,
      password,
      role: "admin",
      firebaseUid: firebaseUid || undefined,
      avatar: photoURL || "",
    };

    user = await User.create(userData);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = verificationToken;
    await user.save({ validateBeforeSave: false });
  }

  // Return user data without token for admin registration
  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
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
});
