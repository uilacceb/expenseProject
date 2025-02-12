import { useContext, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { ExpenseContext } from "../App"
import { creatingExpense } from "../services/expenseService";
import IsIncomeCheckbox from "./IsIncomeCheckbox";



const AddExpenseForm = () => {
  const { user, date, setDate, category, setCategory, amount, setAmount, description, setDescription, note, setNote, isIncome, setIsIncome } = useContext(ExpenseContext)
  const [error, setError] = useState('')
  const navigation = useNavigate();

  useEffect(() => {
    handleReset();
  }, []);


  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    const year = selectedDate.getUTCFullYear();
    const month = String(selectedDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(selectedDate.getUTCDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`
    console.log(formattedDate)
    setDate(formattedDate)
  }



  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please log in to add expenses!");
      return;
    }
    if (!amount) {
      setError("Please enter an amount!");
      return;
    }

    let currentDate = date;
    if (!date) {
      const todayDate = new Date();
      const year = todayDate.getFullYear();
      const month = String(todayDate.getMonth() + 1).padStart(2, '0');
      const day = String(todayDate.getDate()).padStart(2, '0');
      currentDate = `${year}-${month}-${day}`;
      setDate(currentDate)
    }

    if (!Number(amount)) {
      setError("Please enter a value number for amount!")
      return
    }

    let amountNew = amount;
    if (!isIncome) {
      amountNew = amount * -1

    } else {
      amountNew = amount * 1
    }



    let defaultCategory = category
    if (!defaultCategory) {
      defaultCategory = "Grocery"
      setCategory(defaultCategory)
    }
    console.log({ currentDate, defaultCategory, description, amountNew, note })
    try {
      const data = await creatingExpense(currentDate, defaultCategory, description, amountNew, note, user.sub)
      setError("")
      navigation("/transaction-history")
      console.log(`expense created successfully: ${data}`);
      handleReset();
    } catch (error) {
      console.log('created failed: ', error.message);
    }
  }

  const handleReset = () => {
    setDate("")
    setCategory("")
    setAmount(0);
    setDescription("")
    setNote("")
    setIsIncome(false)
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[#2B363C] p-4 rounded-md w-[90%] h-[95%] lg:w-[750px] lg:text-2xl flex justify-center items-center relative ">
        {/* close button */}
        <Link to="/">
          <button className="bg-red-500 rounded-md p-[2px] absolute top-3 right-4"><RiCloseFill color="white" size={24} /></button>
        </Link>
        <form className="h-full flex" onSubmit={handleAddExpense}>
          <fieldset className="flex flex-col items-center lg:w-[500px] w-80 overflow-hidden ">
            {/* date */}
            <div className="attribute_div">
              <label htmlFor="date" className="label_style">Date</label>
              <input
                onChange={handleDateChange}
                type="date"
                id="date"
                name="date"
                className="p-1 rounded-md"
                value={date}>

              </input>
            </div>

            {/* category */}
            <div className="attribute_div">
              <label htmlFor="category" className="label_style">Category</label>
              <select
                name="category"
                id="category"
                className="p-2 rounded-md"
                onChange={(e) => setCategory(e.target.value)}
                value={category} >
                <option value="Grocery">Grocery</option>
                <option value="Income">Income</option>
                <option value="Drinks">Drinks</option>
                <option value="Dessert">Dessert</option>
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
                value={amount}></input>

            </div>

            {/* description */}
            <div className="attribute_div">
              <label htmlFor="description" className="label_style">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className="p-2 rounded-md"
                onChange={(e) => setDescription(e.target.value)}
                value={description}></input>
            </div>

            {/* note */}
            <div className="attribute_div">
              <label htmlFor="note" className="label_style">Note</label>
              <textarea
                id="note"
                name="note"
                className="h-[150px] p-2 rounded-md"
                onChange={(e) => setNote(e.target.value)}
                value={note}
              ></textarea>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {/* button */}
            <div className="attribute_div lg:w-[70%] text-right">
              <button
                className="bg-slate-300 font-mono font-semibold self-end px-2 py-1 rounded-md hover:bg-slate-400 hover:scale-105"

              >Add</button>
            </div>
          </fieldset>
        </form>

      </div >
    </div>
  )
}

export default AddExpenseForm