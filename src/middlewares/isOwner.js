import Finance from "../models/finance.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// user owner middleware
export const isUserOwner = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const userData = await User.findById(userId);

  if (!userData) {
    const error = new Error("User Not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    req.user.role !== "Admin" &&
    userData._id.toString() !== req.user.id
  ) {
    const error = new Error("Forbidden");
    error.statusCode = 403;
    throw error;
  }
  req.user = userData;

  next();
});
//finance owner middleware
export const isFinaceOwner = asyncHandler(async (req, res, next) => {
  const { financeId } = req.params;
  const financeData = await Finance.findById(financeId);

  if (!financeData) {
    const error = new Error("Finance Data Not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    req.user.role !== "Admin" &&
    financeData.createdBy.toString() !== req.user.id
  ) {
    const error = new Error("Not authorized");
    error.statusCode = 403;
    throw error;
  }
  req.finance = financeData;
  next();
});
