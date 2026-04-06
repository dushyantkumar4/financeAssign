import User from "../models/user.model.js";
import Finance from "../models/finance.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//register new user
export const register = asyncHandler(async (req, res) => {
  const { name, email, role, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("user already exist");
    error.status=403;
    throw error;
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    role,
    password: hasedPassword,
  });
  const token = generateToken(user._id, user.role);

  res.status(201).json({ message: "User created successfully", token, user });
});
// login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email");
    error.status=401;
    throw error;
  }
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    const error = new Error("Invalid password");
    error.status=401;
    throw error;
  }
  const token = generateToken(user._id, user.role);
  res.status(200).json({ message: "login successfully", token, user });
});
//get user
export const user = (req, res) => {
  res.status(200).json(req.user);
};
// get all users
export const getAllUser = asyncHandler(async (req, res) => {
  const allUser = await User.find();
  res.json(allUser);
});
//update user
export const updateUser = asyncHandler(async (req, res) => {
  const { name, password, status } = req.body;
  const userData = req.targetUser || req.user;

  userData.name = name ?? userData.name;
  if (password) {
    userData.password = await bcrypt.hash(password, 10);
  }
  userData.status = status ?? userData.status;

  await userData.save();
  res.json({
    success: true,
    message: "user updated successfully",
    data: userData,
  });
});
// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const userData = req.targetUser || req.user;

  // first delete all the finance createdt by user
  await Finance.deleteMany({ createdBy: userData._id });
  await userData.deleteOne();
  res.json({ success: true, message: "user deleted successfully" });
});
// admin update user role
export const updateRole = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("user not found");
    err.statusCode = 404;
    throw err;
  }
  user.role = role;
  await user.save();

  res.json({ message: "user role updated", data: user });
});
