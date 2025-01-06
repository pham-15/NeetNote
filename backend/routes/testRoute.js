import express from "express";
import { loginUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);

// Example of a protected route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
