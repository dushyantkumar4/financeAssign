import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  role: Joi.string().valid("Analyst", "Viewer").optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),

  password: Joi.string().min(6).optional(),

  status: Joi.string().valid("active", "inactive").optional(),
});

export const updateRoleSchema = Joi.object({
  role: Joi.string().valid("Admin", "Analyst", "Viewer").required(),
});
