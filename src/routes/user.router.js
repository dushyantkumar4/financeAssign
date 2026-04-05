import { Router } from "express";
import {
  login,
  register,
  user,
  updateUser,
  deleteUser,
  getAllUser,
  updateRole,
} from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import { isUserOwner } from "../middlewares/isOwner.js";
import { authorize } from "../middlewares/roleAuth.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", protect, user);
router.get("/users", protect, authorize("Admin"), getAllUser);
router.put("/me/:userId", protect, isUserOwner, updateUser);
router.delete("/me/:userId", protect, isUserOwner, deleteUser);
router.put("/me/:userId/role",protect,authorize("Admin"),updateRole);

export default router;
