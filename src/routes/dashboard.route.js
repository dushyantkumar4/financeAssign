import { Router } from "express";
import { getSummery } from "../controllers/dashboardController.js";
import { protect } from "../middlewares/auth.js";
import {isUserOwner} from "../middlewares/isOwner.js";

const router = Router();

router.get("/dashboard/:userId",protect,isUserOwner,getSummery);

export default router;