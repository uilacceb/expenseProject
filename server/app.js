import express from "express"
import { connectDB } from "./db.js"
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to expense Application" })
})

app.listen(8000, () => {
  connectDB();
  console.log(`Server is running on port 8000`);
})

app.use(express.json)