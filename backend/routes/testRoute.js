import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { loginUser } from "../controllers/userController.js";
import { getUserNotesById } from "../controllers/noteController.js";

const router = express.Router();

router.post("/login", loginUser);

// Example of a protected route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({ user: req.user.notes });
});

router.get("/:id/allNotes", protect, getUserNotesById);

export default router;
