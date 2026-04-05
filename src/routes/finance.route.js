import { Router } from "express";
import {
  addFinanceData,
  deleteFinance,
  updateFinanceData,
} from "../controllers/financeController.js";
import { authorize } from "../middlewares/roleAuth.js";
import { protect } from "../middlewares/auth.js";
import { isFinanceOwner } from "../middlewares/isOwner.js";
const router = Router();

router.post("/amount", protect, authorize("Analyst", "Admin"), addFinanceData);
router.put("/amount/:financeId", protect, isFinanceOwner, updateFinanceData);
router.delete("/amount/:financeId", protect, isFinanceOwner, deleteFinance);

export default router;
