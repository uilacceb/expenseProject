import express from "express"
import { connectDB } from "./db.js"
import dotenv from "dotenv"
import cors from 'cors';
import ExpenseRouter from "./routes/expense.route.js";
dotenv.config()

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Welcome to expense Application" })
})

app.listen(8000, () => {
  connectDB();
  console.log(`Server is running on port 8000`);
})


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json())
app.use(ExpenseRouter)

export default app;