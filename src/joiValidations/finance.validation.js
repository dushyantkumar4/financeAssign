import Joi from "joi";

export const createFinanceSchema = Joi.object({
  amount: Joi.number().positive().required(),

  type: Joi.string().valid("income", "expense").required(),

  category: Joi.string().required(),

  date: Joi.date().optional(),
});

export const updateFinanceSchema = Joi.object({
  amount: Joi.number().positive().optional(),

  type: Joi.string().valid("income", "expense").optional(),

  category: Joi.string().optional(),

  date: Joi.date().optional(),
});
