import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";

dotenv.config();

const testSchema = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });

    const user = new User({
      userName: "phammmm15",
      email: "phamalex05@gmail.com",
      password: "opkololo",
      notes: [
        {
          problemNumber: 1,
          title: "Two Sum",
          difficulty: "easy",
          tags: ["Array", "Hash Table"],
        },
      ],
    });

    const savedUser = await user.save();
    console.log("Saved User: ", savedUser);

    console.log("Is password hashed? ", savedUser.password !== "opkololo");

    await User.deleteOne({ email: "phamalex05@gmail.com" });
    console.log("Test user deleted.");
  } catch (error) {
    console.error("Error during  test: ", error);
  } finally {
    mongoose.connection.close();
  }
};

testSchema();
