import express from "express"
import { connectDB } from "./db.js"
import dotenv from "dotenv"
import cors from 'cors'
import ExpenseRouter from "./routes/expense.route.js"

dotenv.config()

const app = express();

// Move CORS and middleware setup to top
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://expense-project-backend.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json())

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to expense Application" })
})

app.use(ExpenseRouter)

export default app