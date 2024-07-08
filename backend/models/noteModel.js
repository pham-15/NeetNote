import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
    {
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
                enum: [
                    "easy",
                    "medium",
                    "hard"
                ],
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
    }
)

export const Note = mongoose.model('Note', noteSchema);