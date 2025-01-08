import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoute.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Mount user routes under "/api/users"
app.use("/test/users", testRoutes);

app.use("/notes", notesRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

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

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error: ", error);
  });
