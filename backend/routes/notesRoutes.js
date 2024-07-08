import express from "express";
import { Note } from '../models/noteModel.js';

const router = express.Router();

// Route to save a note
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.problemNumber ||
      !request.body.title ||
      !request.body.difficulty ||
      !request.body.tags
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: Problem Number, Title, Difficulty Level, and Tags",
      });
    }
    const newNote = {
      problemNumber: request.body.problemNumber,
      title: request.body.title,
      difficulty: request.body.difficulty,
      tags: request.body.tags,
    };
    const note = await Note.create(newNote);

    return response.status(201).send(note);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get all notes from database
router.get("/", async (request, response) => {
  try {
    const notes = await Note.find({});

    return response.status(200).json({
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to get one note from database
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const note = await Note.findById(id);

    if (!note) {
      return response.status(404).json({ message: "Note not found" });
    }

    return response.status(200).json({ note });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to update a note
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.problemNumber ||
      !request.body.title ||
      !request.body.difficulty ||
      !request.body.tags
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: Problem Number, Title, Difficulty Level, and Tags",
      });
    }

    const { id } = request.params;

    const result = await Note.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Note not found" });
    }
    return response.status(200).send({ message: "Note updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a note
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Note.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Note not found" });
    }
    return response.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});


export default router;