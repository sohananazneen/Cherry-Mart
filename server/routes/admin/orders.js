import express from "express";
import {
  getOrders,
  getAdminOrderStats,
} from "../../controllers/admin/orderController.js";
import { protect, authorize } from "../../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/", getOrders);
router.get("/stats", getAdminOrderStats);

export default router;
