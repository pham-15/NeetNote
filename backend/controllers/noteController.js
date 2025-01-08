import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import generateToken from "../utils/jwt.js";

export const getUserNotes = async (req, res) => {
  try {
    const user = await User.findById(
      new mongoose.Types.ObjectId(req.user.id)
    ).select("notes");

    if (!user) {
      return res.status(404).json({ message: "getUserNotes: User not found" });
    }

    res.status(200).json({ notes: user.notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getUserNotes: ", error: error.message });
  }
};

export const getUserNotesById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("notes");

    if (!user) {
      return res.status(404).json({ message: "getUserNotes: User not found" });
    }

    res.status(200).json({ notes: user.notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getUserNotes: ", error: error.message });
  }
};
