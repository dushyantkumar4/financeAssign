import { Router } from "express";
import { login, register, user } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", protect, user);

export default router;
