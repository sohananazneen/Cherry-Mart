import express from "express";
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
  getNewProducts,
  getSaleProducts,
  getRelatedProducts,
  addProductReview,
  getProductCategories,
  getProductBrands,
} from "../../controllers/user/productController.js";
import { protect } from "../../middleware/auth.js";

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

export default router;
