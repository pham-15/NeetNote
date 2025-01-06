import mongoose from "mongoose";
import bcrypt from "bcrypt";

const noteSchema = mongoose.Schema({
  problemNumber: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: {
      type: [noteSchema],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log("ERROR: Saving Hashed Password ", error);
    next(error);
  }
});

export const User = mongoose.model("User", userSchema);
