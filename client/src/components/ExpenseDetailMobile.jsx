import { useContext, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ExpenseContext } from "../App";
import { deletingExpense, gettingExpenseById } from "../services/expenseService";


const ExpenseDetailMobile = () => {
  const { date, setDate, category, setCategory, description, setDescription, amount, setAmount, note, setNote, user } = useContext(ExpenseContext)
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async (id, userId) => {
    try {
      await deletingExpense(id, userId);
      navigate('/transaction-history')
    } catch (error) {
      console.error("failed to delete expense: ", error)
    }
  }


  useEffect(() => {
    const fetchExpenseData = async () => {
      console.log(id)
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

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[#2B363C] p-4 rounded-md w-[90%] h-[80%] lg:w-[750px] lg:text-2xl flex flex-col gap-[60px] justify-center items-center relative caret-transparent md:text-[2.8vw] md:pt-20">
        <Link to="/transaction-history">
          <button className="bg-slate-600 rounded-md p-[2px] absolute top-3 right-4 hover:bg-red-500"><RiCloseFill color="white" size={24} /></button>
        </Link>
        <div className="flex flex-col  h-full gap-16">
          <div className="text-white flex font-semibold font-mono  ">
            <p className="w-[190px] md:w-[300px]" >Date:</p><p className="flex-1 text-left">{date}</p>
          </div>
          <div className="text-white flex font-semibold  font-mono ">
            <p className="w-[190px] md:w-[300px]" >Category:</p><p className="flex-1 text-left">{category}</p>
          </div>
          <div className="text-white flex font-semibold font-mono">
            <p className="w-[190px] md:w-[300px]" >Amount:</p><p className="flex-1 text-left">${amount}</p>
          </div>
          <div className="text-white flex font-semibold  font-mono ">
            <p className="w-[190px] md:w-[300px]">Description:</p>
            <p className="flex-1 text-left">{description ? description : "None"}</p>
          </div>
          <div className="text-white flex font-semibold  font-mono">
            <p className="w-[190px] md:w-[300px]">Note:</p><p className="flex-1 text-left text-wrap">{note ? note : "None"}</p>
          </div>
        </div>
        <div className="w-full text-right mb-2 mr-2">
          <button
            className="font-mono rounded-md text-white bg-[#e73c3c] font-semibold px-2 py-1 mr-3"
            onClick={() => handleDelete(id, user.sub)}
          >delete</button>
          <button
            className="font-mono rounded-md  text-white bg-[#2a65a0] font-semibold px-2 py-1"
            onClick={() => navigate(`/update-expense/${id}`)}
          >edit</button>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetailMobile