import express from "express";
import {
  getUsers,
  updateUserRole,
  verifyUser,
  deleteUser,
} from "../../controllers/admin/userController.js";
import { protect, authorize } from "../../middleware/auth.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.use((req, res, next) => {
  console.log(`Admin User Route hit: ${req.method} ${req.url}`);
  next();
});

router.get("/", getUsers);
router.put("/:id/role", updateUserRole);
router.put("/:id/verify", verifyUser);
router.delete("/:id", deleteUser);

export default router;
