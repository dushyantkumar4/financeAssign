import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//register new user
export const register = asyncHandler(async (req, res) => {
  const { name, email, role, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(403);
    throw new Error("user already exist");
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
    res.status(401);
    throw new Error("Invalid email");
  }
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    res.status(401);
    throw new Error("Invalid password");
  }
  const token = generateToken(user._id, user.role);
  res.status(200).json({ message: "login successfully", token, user });
});
//get user
export const user = (req, res) => {
  res.status(200).json(req.user);
};
