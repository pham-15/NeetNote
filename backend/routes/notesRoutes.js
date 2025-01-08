import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { loginUser } from "../controllers/userController.js";
import { getUserNotesById } from "../controllers/noteController.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/:id/allNotes", protect, getUserNotesById);

export default router;
