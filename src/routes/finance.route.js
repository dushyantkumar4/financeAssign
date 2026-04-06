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
import { validate } from "../middlewares/validate.js";
import {
  updateFinanceSchema,
  createFinanceSchema,
} from "../joiValidations/finance.validation.js";

router.post(
  "/amount",
  protect,
  authorize("Analyst", "Admin"),
  validate(createFinanceSchema),
  addFinanceData,
);
router.put(
  "/amount/:financeId",
  protect,
  isFinanceOwner,
  validate(updateFinanceSchema),
  updateFinanceData,
);
router.delete("/amount/:financeId", protect, isFinanceOwner, deleteFinance);

export default router;
