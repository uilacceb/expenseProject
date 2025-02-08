import Expense from "../models/expense.model.js"

//create an expense
export const createExpense = async (req, res) => {
  try {
    const { date, category, description, amount, note, userId } = req.body;
    console.log(req.body);
    const expense = await Expense.create({ date, category, description, amount, note, userId });
    res.status(200).json(expense);
  } catch (error) {
    console.log("error creating expense: ", error);
    res.status(500).json({ message: error.message })
  }
}

//get all expense from a user
export const getAllExpense = async (req, res) => {
  try {
    const userId = req.query.userId;
    const expense = await Expense.find({ userId: userId })
    res.status(200).json(expense)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//delete an expense 
export const deleteExpense = async (req, res) => {
  try {
    const userId = req.query.userId;
    const expenseId = req.params.id;
    const expense = await Expense.findOneAndDelete({ userId: userId, _id: expenseId })

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" })
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//modify an expense
export const modifyExpense = async (req, res) => {
  try {
    const userId = req.query.id;
    const expenseId = req.params.id;
    const expense = await Expense.findOneAndUpdate(
      { userId: userId, _id: expenseId },
      req.body,
      { new: true })
    if (!expense) {
      res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//show single expense detail
export const getExpenseById = async (req, res) => {
  try {
    const userId = req.query.userId;
    const expenseId = req.params.id;
    const expense = await Expense.findOne({ userId: userId, _id: expenseId });
    if (!expense) {
      res.status(404).json({ message: "Expense not found!" })
    }
    res.status(200).json(expense)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
