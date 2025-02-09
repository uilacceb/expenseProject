import { useContext, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ExpenseContext } from "../App";
import { gettingExpenseById, modifyingExpense } from "../services/expenseService";
import IsIncomeCheckbox from "./IsIncomeCheckbox";
;

const AddExpenseForm = () => {
  const { date, setDate, category, setCategory, description, setDescription, amount, setAmount, note, setNote, user, isIncome } = useContext(ExpenseContext)
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const expense = await gettingExpenseById(id, user.sub);
        if (expense) {
          setDate(expense.date)
          setCategory(expense.category)
          setDescription(expense.description)
          setAmount(expense.amount)
          setNote(expense.note)
        }

      } catch (error) {
        console.error(error.message)
      }
    }
    fetchExpenseData()
  }, [])

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setDate(formattedDate)
  }

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    if (!amount) {
      setError("Please enter an amount!");
      return
    }

    let currentDate = date;
    if (!currentDate) {
      const selectedDate = new Date();
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      currentDate = `${year}-${month}-${day}`;
    }

    if (!Number(amount)) {
      setError("Please enter a valid number for amount")
      return
    }
    let amountNew = isIncome ? Math.abs(amount) : -Math.abs(amount);
    try {
      await modifyingExpense(id, currentDate, category, description, amountNew, note, user.sub);
      navigate('/transaction-history');
    } catch (error) {
      console.error('Update failed:', error);
      setError("Failed to update expense. Please try again.");
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[#2B363C] p-4 rounded-md w-[90%] h-[90%] lg:w-[750px] lg:text-2xl flex justify-center items-center relative ">
        <Link to="/transaction-history">
          <button className="bg-red-500 rounded-md p-[2px] absolute top-3 right-4"><RiCloseFill color="white" size={24} /></button>
        </Link>
        <form className="h-full flex" onSubmit={handleUpdateExpense}>
          <fieldset className="flex flex-col items-center lg:w-[500px] w-80 overflow-hidden ">
            {/* date */}
            <div className="attribute_div">
              <label htmlFor="date" className="label_style">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="p-1 rounded-md"
                value={date}
                onChange={handleDateChange}></input>
            </div>

            {/* category */}
            <div className="attribute_div">
              <label htmlFor="category" className="label_style">Category</label>
              <select
                name="category"
                id="category"
                className="p-2 rounded-md"
                onChange={(e) => setCategory(e.target.value)} >
                <option value="Grocery">Grocery</option>
                <option value="Income">Income</option>
                <option value="Travel">Travel</option>
                <option value="Gas">Gas</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Pet">Pet</option>
                <option value="Insurance">Insurance</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Medical">Medical</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* amount */}
            <div className="attribute_div">
              <label htmlFor="amount" className="label_style flex justify-between">Amount<IsIncomeCheckbox /></label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="p-2 rounded-md"
                onChange={(e) => setAmount(e.target.value)}
                value={Math.abs(amount)}></input>
            </div>

            {/* description */}
            <div className="attribute_div">
              <label htmlFor="description" className="label_style">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className="p-2 rounded-md"
                onChange={(e) => { setDescription(e.target.value) }}
                value={description}></input>
            </div>

            {/* note */}
            <div className="attribute_div">
              <label htmlFor="note" className="label_style">Note</label>
              <textarea
                id="note"
                name="note"
                className="h-[150px] p-2 rounded-md"
                onChange={(e) => { setNote(e.target.value) }}
                value={note}
              ></textarea>
            </div>

            {/* button */}
            {error && <div className="text-red-500">{error}</div>}
            <div className="attribute_div lg:w-[70%] text-right">
              <button className="bg-slate-300 font-mono font-semibold self-end  px-2 py-1 rounded-md hover:bg-slate-400 hover:scale-105" type='submit'>Update</button>
            </div>
          </fieldset>
        </form>

      </div >
    </div>
  )
}

export default AddExpenseForm