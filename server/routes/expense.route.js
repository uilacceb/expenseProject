import Router from "express"
import { createExpense, getAllExpense, deleteExpense, modifyExpense, getExpenseById } from "../controllers/expense.controller.js"

const router = Router();

//middleware of checking userId which can stop the request before it ever hits your controller logic. This can help simplify your controller so it doesn’t have to worry about basic validation
const checkUserId = (req, res, next) => {
  const userId = req.body.userId || req.query.userId;
  if (!userId) {
    res.status(401).json({ message: "User Id us required, please log in!" })
  }
  next();//This means “okay, we’re done with our check; you can continue to the next step in the middleware chain or route handler.”
};
router.post('/api/expense', checkUserId, createExpense)
router.get('/api/expense', checkUserId, getAllExpense)
router.get('/api/expense/:id', checkUserId, getExpenseById)
router.delete('/api/expense/:id', checkUserId, deleteExpense)
router.put('/api/expense/:id', checkUserId, modifyExpense)

export default router;
