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
      return res
        .status(404)
        .json({ message: "getUserNotesById: User not found" });
    }

    res.status(200).json({ notes: user.notes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getUserNotes: ", error: error.message });
  }
};

export const createNewNote = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "createNewNote: User not found" });
    }

    const { problemNumber, title, difficulty, tags, note } = req.body;

    if (!problemNumber || !title || !difficulty || !note) {
      return res.status(400).send({
        message:
          "Send the required fields: problemNumber, title, difficulty, note",
      });
    }

    const newNote = {
      problemNumber,
      title,
      difficulty,
      // Tags are not required
      tags: tags || [],
      note: note,
    };

    user.notes.push(newNote);
    await user.save();
    res
      .status(201)
      .json({ message: "Note created successfully: ", note: newNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in createNewNote: ", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { problemNumber } = req.body;

    // const problemNumber = req.query.problemNumber;

    if (!user) {
      return res.status(404).json({ message: "deleteNote: User not found" });
    }

    const noteExists = user.notes.some(
      (note) => note.problemNumber === problemNumber
    );
    if (!noteExists) {
      return res.status(404).json({ message: "Note not found" });
    }

    user.notes.pull({ problemNumber: problemNumber });
    await user.save();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleteNote: ", error: error.message });
  }
};

export const getANote = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "getNote: User not found" });
    }

    const { problemNumber } = req.body;
    const noteIndex = user.notes.findIndex(
      (note) => note.problemNumber === problemNumber
    );

    if (noteIndex === -1) {
      return res.status(404).json({ message: "getNote: Note not found" });
    }

    res.status(200).json({
      message: "Successfully retrieved note ",
      note: user.notes[noteIndex],
    });
  } catch (error) {
    res.status(500).json({ message: "Error in getNote", error: error.message });
  }
};

export const editNote = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "editNote: User not found" });
    }

    const { problemNumber, title, difficulty, tags, note } = req.body;

    const noteIndex = user.notes.findIndex(
      (note) => note.problemNumber === problemNumber
    );

    if (noteIndex === -1) {
      return res.status(404).json({ message: "editNOte: Note not found" });
    }

    user.notes[noteIndex].title = title || user.notes[noteIndex].title;
    user.notes[noteIndex].difficulty =
      difficulty || user.notes[noteIndex].difficulty;
    user.notes[noteIndex].tags = tags || user.notes[noteIndex].tags;
    user.notes[noteIndex].note = note || user.notes[noteIndex].note;

    await user.save();
    res.status(200).json({
      message: "Note updated successfully",
      note: user.notes[noteIndex],
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in editNote", error: error.message });
  }
};
