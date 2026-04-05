import { Router } from "express";
import {
  addFinanceData,
  deleteFinance,
  updateFinanceData,
} from "../controllers/financeController.js";
import { authorize } from "../middlewares/roleAuth.js";
import { protect } from "../middlewares/auth.js";
import { isFinaceOwner } from "../middlewares/isOwner.js";
const router = Router();

router.post("/amount", protect, authorize("Analyst", "Admin"), addFinanceData);
router.put("/amount/:financeId", protect, isFinaceOwner, updateFinanceData);
router.delete("/amount/:financeId", protect, isFinaceOwner, deleteFinance);

export default router;
