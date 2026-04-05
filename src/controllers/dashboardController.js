import Finance from "../models/finance.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getSummery = asyncHandler(async (req, res) => {
  const userData = req.user;

  const data = await Finance.aggregate([
    {
      $match: {
        createdBy: userData._id,
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

  res.json({
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  });
});
