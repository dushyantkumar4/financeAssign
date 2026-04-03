import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get the token from the header (it looks like: "Bearer <token_string>")
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user and attach them to the request object
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      return next(); // Proceed to the next middleware/controller
      
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  // If no token was found in the headers at all
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};