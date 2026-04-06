import Finance from "../models/finance.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const dashboardData = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();

  const activeUsers = await User.countDocuments({
    status: "active",
  });
  res.json({ totalUsers, activeUsers });
});

export const getSummary = asyncHandler(async (req, res) => {
  const targetUserId = req.targetUser ? req.targetUser._id : req.user._id;
  const { category, days } = req.query;

  //summury of the finance
  const data = await Finance.aggregate([
    {
      $match: {
        createdBy: targetUserId,
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);
  let totalIncome = 0;
  let totalExpense = 0;
  data.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  let matchStage = {
    createdBy: targetUserId,
    date: {
      $gte: startOfMonth,
      $lt: endOfMonth,
    },
  };

  if (category) {
    const categories = category.split(",");
    matchStage.category = { $in: categories };
  }
  if (days) {
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - Number(days));
    matchStage.date = { $gte: fromDate };
  }
  // category wise total
  const categoryTotals = await Finance.aggregate([
    {
      $match: {
        ...matchStage,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);
  // month expense total
  const monthlyTrends = await Finance.aggregate([
    {
      $match: {
        ...matchStage,
        type: "expense",
      },
    },
    {
      $group: {
        _id: { month: { $month: "$date" } },
        total: { $sum: "$amount" },
      },
    },
  ]);
  // recent Activity
  const recent = await Finance.find({ createdBy: targetUserId })
    .sort({ date: -1 })
    .limit(5);

  res.json({
    summery: {
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
    },
    categoryTotals: categoryTotals.map((item) => ({
      category: item._id,
      total: item.total,
    })),
    monthlyTrends: monthlyTrends.map((item) => ({
      month: item._id.month,
      total: item.total,
    })),
    recent,
  });
});
