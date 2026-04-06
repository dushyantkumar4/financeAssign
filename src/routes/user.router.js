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
import { validate } from "../middlewares/validate.js";
import {
  updateRoleSchema,
  registerSchema,
  loginSchema,
  updateUserSchema,
} from "../joiValidations/user.validation.js";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registerSchema), register);
router.get("/me", protect, user);
router.get("/users", protect, authorize("Admin"), getAllUser);
router.put(
  "/me/:userId",
  protect,
  isUserOwner,
  validate(updateUserSchema),
  updateUser,
);
router.delete("/me/:userId", protect, isUserOwner, deleteUser);
router.put(
  "/me/:userId/role",
  protect,
  authorize("Admin"),
  validate(updateRoleSchema),
  updateRole,
);

export default router;
