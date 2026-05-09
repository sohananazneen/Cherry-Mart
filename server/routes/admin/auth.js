import express from "express";
import { registerAdmin } from "../../controllers/admin/authController.js";

const router = express.Router();

// Public routes (requires admin secret key)
router.post("/admin-register", registerAdmin);

export default router;
