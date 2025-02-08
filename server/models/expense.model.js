import mongoose from "mongoose"

const ExpenseSchema = mongoose.Schema({
  date: {
    type: String,
  },
  description: {
    type: String
  },
  category: {
    type: String,
  },
  amount: {
    type: Number,
    require: true
  },
  note: {
    type: String
  },
  userId: {
    type: String,
    require: true
  }
},
  { timestamps: true }
)

export default mongoose.model("Expense", ExpenseSchema)