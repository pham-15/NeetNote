import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { loginUser } from "../controllers/userController.js";
import {
  getUserNotesById,
  createNewNote,
  deleteNote,
  editNote,
  getANote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/login", loginUser);

router.get("/:id/allNotes", protect, getUserNotesById);

router.post("/:id/createNote", protect, createNewNote);

router.delete("/:id/deleteNote", protect, deleteNote);

router.get("/:id/getANote", protect, getANote);

router.put("/:id/editNote", protect, editNote);

export default router;
