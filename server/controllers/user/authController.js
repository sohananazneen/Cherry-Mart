import crypto from "crypto";
import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import { sendTokenResponse } from "../authUtils.js";

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

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

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists with this email",
    });
  }

  // Create user (only admin can set role, but this is the user register endpoint)
  const userData = { name, email, password };
  // Note: we don't allow setting role here for normal registration
  
  const user = await User.create(userData);

  // Generate email verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  user.emailVerificationToken = verificationToken;
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 201, res, "User registered successfully");
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password",
    });
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Check if account is locked
  if (user.isLocked()) {
    return res.status(423).json({
      success: false,
      message:
        "Account is temporarily locked due to multiple failed attempts. Please try again later.",
    });
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    // Increment login attempts
    user.loginAttempts += 1;

    // Lock account after 5 failed attempts
    if (user.loginAttempts >= 5) {
      user.lockUntil = Date.now() + 2 * 60 * 60 * 1000; // Lock for 2 hours
    }

    await user.save({ validateBeforeSave: false });

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // Reset login attempts on successful login
  user.loginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res, "Login successful");
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
    },
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, avatar } = req.body;

  const user = await User.findById(req.user._id);

  if (name) user.name = name;
  if (email) {
    // Check if email is already taken by another user
    const existingUser = await User.findOne({ email, _id: { $ne: user._id } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already taken",
      });
    }
    user.email = email;
    user.emailVerified = false; // Require re-verification for new email
  }
  if (avatar) user.avatar = avatar;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      emailVerified: user.emailVerified,
    },
  });
});

// @desc    Change password
// @route   PUT /api/auth/password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide current password and new password",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "New password must be at least 6 characters long",
    });
  }

  const user = await User.findById(req.user._id).select("+password");

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide your email address",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found with this email address",
    });
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Password reset instructions sent to your email",
  });
});

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Please provide reset token and new password",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long",
    });
  }

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  // Set new password
  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  sendTokenResponse(user, 200, res, "Password reset successful");
});

// @desc    Demo login (for testing)
// @route   POST /api/auth/demo
// @access  Public
export const demoLogin = asyncHandler(async (req, res) => {
  const { role = "user" } = req.body;

  // Find or create demo user
  let user = await User.findOne({ email: `demo-${role}@example.com` });

  if (!user) {
    user = await User.create({
      name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `demo-${role}@example.com`,
      password: "demo123",
      role: role,
      emailVerified: true,
    });
  }

  sendTokenResponse(user, 200, res, `Demo login successful as ${role}`);
});

// @desc    Sync Firebase user with MongoDB
// @route   POST /api/auth/sync-firebase
// @access  Public
export const syncFirebaseUser = asyncHandler(async (req, res) => {
  const { uid, email, displayName, photoURL, emailVerified } = req.body;

  if (!uid || !email) {
    return res.status(400).json({
      success: false,
      message: "UID and email are required",
    });
  }

  // Check if user exists by Firebase UID
  let user = await User.findOne({ firebaseUid: uid });

  if (!user) {
    // Check if user exists by email (in case they registered with email/password first)
    user = await User.findOne({ email });

    if (user) {
      // Update existing user with Firebase UID
      user.firebaseUid = uid;
      if (displayName) user.name = displayName;
      if (photoURL) user.avatar = photoURL;
      user.emailVerified = emailVerified || false;
      await user.save({ validateBeforeSave: false });
    } else {
      // Create new user from Firebase
      user = await User.create({
        firebaseUid: uid,
        email,
        name: displayName || email.split("@")[0],
        avatar: photoURL || "",
        emailVerified: emailVerified || false,
        role: "user",
        password: Math.random().toString(36).slice(-8), // Random password for Firebase users
      });
    }
  }

  sendTokenResponse(user, 200, res, "User synced successfully");
});
