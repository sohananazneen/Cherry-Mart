import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../../controllers/admin/productController.js";
import { protect, authorize } from "../../middleware/auth.js";

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize("admin"));

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/stats/dashboard", getProductStats);

export default router;
