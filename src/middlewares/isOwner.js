import Finance from "../models/finance.model.js";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isUserOwner = asyncHandler(async (req, res, next) => {
  const User = await User.findById(req.params.id);

  if (!User) {
    const error = new Error("User Not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    req.user.role !== "Admin" &&
    User._id.toString() !== req.user._id.toString()
  ) {
    throw new Error("Forbidden");
  }

  
  next();
});

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
    financeData.createdBy.toString() !== req.user._id.toString()
  ) {
    const error = new Error("Not authorized");
    error.statusCode = 403;
    throw error;
  }

  next();
});
