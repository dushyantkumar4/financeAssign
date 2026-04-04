import { Router } from "express";
import { addFinanceData } from "../controllers/financeController.js";
import { authorize } from "../middlewares/roleAuth.js";
import { protect } from "../middlewares/auth.js";
import { isOwner } from "../middlewares/isOwner.js";
const router = Router();

router.post(
  "/amount",
  protect,
  authorize("Analyst", "Admin"),
  addFinanceData,
);

router.put("/amount/:finaceId",protect,isOwner);
router.delete("/amount/:",protect,isOwner);

export default router;
