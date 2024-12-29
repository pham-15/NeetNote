import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  console.log(
    "request: ",
    request,
    "request.method: ",
    request.method,
    "request.url: ",
    request.url
  );
  response.status(200).send("Welcome to NeetNote");
});

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
