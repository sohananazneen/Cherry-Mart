import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getMyStats,
} from "../../controllers/user/orderController.js";
import { protect } from "../../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/", addOrderItems);
router.get("/myorders", getMyOrders);
router.get("/mystats", getMyStats);

export default router;
