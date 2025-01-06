import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import generateToken from "../utils/jwt.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "loginUser: No user found with email" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(401)
        .json({ message: "loginUser: Invalid credentials" });

    const token = generateToken(user._id);

    res.status(202).json({
      message: "Login successful",
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "ERROR in loginUser: ", error: error.message });
  }
};
