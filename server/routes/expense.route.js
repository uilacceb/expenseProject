import Router from "express"
import { createExpense, getAllExpense, deleteExpense, modifyExpense, getExpenseById } from "../controllers/expense.controller.js"

const ExpenseRouter = Router();

//middleware of checking userId which can stop the request before it ever hits your controller logic. This can help simplify your controller so it doesn’t have to worry about basic validation
const checkUserId = (req, res, next) => {
  const userId = req.body.userId || req.query.userId;
  if (!userId) {
    return res.status(401).json({ message: "User Id us required, please log in!" })
  }
  next();//This means “okay, we’re done with our check; you can continue to the next step in the middleware chain or route handler.”
};
ExpenseRouter.post('/api/expense', checkUserId, createExpense)
ExpenseRouter.get('/api/expense', checkUserId, getAllExpense)
ExpenseRouter.get('/api/expense/:id', checkUserId, getExpenseById)
ExpenseRouter.delete('/api/expense/:id', checkUserId, deleteExpense)
ExpenseRouter.put('/api/expense/:id', checkUserId, modifyExpense)

export default ExpenseRouter;
