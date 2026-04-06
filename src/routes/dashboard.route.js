import { Router } from "express";
import {
  dashboardData,
  getSummary,
} from "../controllers/dashboardController.js";
import { protect } from "../middlewares/auth.js";
import { isUserOwner } from "../middlewares/isOwner.js";
import { authorize } from "../middlewares/roleAuth.js";

const router = Router();

router.get(
  "/dashboard",
  protect,
  authorize("Admin", "Viewer", "Analyst"),
  dashboardData,
);
router.get("/dashboard/:userId", protect, isUserOwner, getSummary);

export default router;
