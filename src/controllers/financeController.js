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

  res.status(201).json({ message: "Data added", FinanceData });
});

export const updateFinanceData = asyncHandler(async (req, res) => {
  const { amount, type, category, date } = req.body;
  const { financeId } = req.params;
  const financeData = Finance.findById(financeId);
  if (!financeData) {
    const error = new Error("Transaction not found");
    error.statusCode = 404;
    throw error;
  }

 
});

export const deleteFinance = asyncHandler(async (req, res) => {
  const { financeId } = req.params;

  const finance = await Finance.findById(financeId);

  if (!finance) {
    const error = new Error("Transaction not found");
    error.status = 404;
    throw error;
  }
  await finance.deleteOne();
  res.json({ succuss: true, message: "finance deleted" });
});
