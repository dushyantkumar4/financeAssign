import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//register new user
export const register = asyncHandler(async (req, res) => {
  const { name, email, role, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("user already exist");
    error.status(403);
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
    error.status(401);
    throw error;
  }
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    const error = new Error("Invalid password");
    error.status(401);
    throw error;
  }
  const token = generateToken(user._id, user.role);
  res.status(200).json({ message: "login successfully", token, user });
});
//get user
export const user = (req, res) => {
  res.status(200).json(req.user);
};
