import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({
        message: "Error in protect. Not authorized, invalid token.",
        error: error.message,
      });
    }
  }

  if (!token) {
    res
      .status(404)
      .json({ message: "Error in protect. Not authorized, invalid token." });
  }
};
