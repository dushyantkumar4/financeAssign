import Finance from "../models/finance.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addFinanceData = asyncHandler(async (req, res) => {
  const { amount, type, category, date } = req.body;

  const FinanceData = await Finance.create({
    amount,
    type,
    category,
    date: date ? new Date(date) : new Date(),
    createdBy: req.user._id,
  });

  res.status(201).json({ message: "Finance Data added", FinanceData });
});

export const updateFinanceData = asyncHandler(async (req, res) => {
  const { amount, type, category, date } = req.body;
  const financeData = req.finance;

  financeData.amount = amount ?? financeData.amount;
  financeData.type = type ?? financeData.type;
  financeData.category = category ?? financeData.category;
  financeData.date = date ? new Date(date) : financeData.date;

  await financeData.save();

  res.json({ message: "finance updated", data: financeData });
});

export const deleteFinance = asyncHandler(async (req, res) => {
  const financeData = req.finance;

  await financeData.deleteOne();
  res.json({ success: true, message: "finance deleted" });
});
