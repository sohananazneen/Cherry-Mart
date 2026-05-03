import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getNewProducts,
  getSaleProducts,
  getRelatedProducts,
  addProductReview,
  getProductCategories,
  getProductBrands,
  getProductStats
} from "../controllers/productController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/new", getNewProducts);
router.get("/sale", getSaleProducts);
router.get("/categories", getProductCategories);
router.get("/brands", getProductBrands);
router.get("/:id", getProductById);
router.get("/:id/related", getRelatedProducts);

// Protected routes
router.post("/:id/reviews", protect, addProductReview);

// Admin routes
router.post("/", protect, authorize("admin"), createProduct);
router.put("/:id", protect, authorize("admin"), updateProduct);
router.delete("/:id", protect, authorize("admin"), deleteProduct);
router.get("/stats/dashboard", protect, authorize("admin"), getProductStats);

export default router;
