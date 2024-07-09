import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import notesRoutes from './routes/notesRoutes.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to NeetNote");
});

app.use('/notes', notesRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("There has been an error connecting to database");
  });
