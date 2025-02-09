import { Link, useNavigate } from "react-router-dom"
import HamburgerMenu from "./HamburgerMenu"
import ToggleMenu from "./ToggleMenu"
import { useContext, useEffect, useState } from "react"
import { ExpenseContext } from "../App"
import { deletingExpense, gettingAllExpense } from "../services/expenseService"
import { FaPlus } from "react-icons/fa6"
import { FiRefreshCcw } from "react-icons/fi";



const TransactionHistory = () => {
  const { expenseList, setExpenseList, user } = useContext(ExpenseContext)
  const [toggleRefresh, setToggleRefresh] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const allExpense = await gettingAllExpense(user.sub);
        setExpenseList(allExpense);
      } catch (error) {
        console.error("Failed to fetch expense: ", error.message);
      }
    }
    fetchExpense()
  }, [toggleRefresh])

  const handleDelete = async (id, userId) => {
    try {
      await deletingExpense(id, userId);
      setToggleRefresh(prev => prev + 1) //to trigger a re-fetch
    } catch (error) {
      console.error("failed to delete expense: ", error)
    }
  }

  return (
    <div className="flex min-h-screen  ">
      <ToggleMenu />
      <div className="flex flex-col flex-1  p-4">
        <HamburgerMenu />
        <div className="bg-[#2B363C] text-white font-mono">
          <table className="lg:table-fixed w-full ">
            <thead className="bg-[#100f0fbf]" >
              <tr className=" h-[50px] text-left ">
                <th className="hidden lg:table-cell w-1/12">#</th>
                <th className="w-1/5 lg:text-left text-center">Date</th>
                <th className="hidden lg:table-cell w-1/6">Category</th>
                <th className="w-1/6">Amount</th>
                <th className="hidden lg:table-cell w-1/6">Description</th>
                <th className="hidden lg:table-cell w-1/6">Note</th>
                <th className="hidden lg:table-cell w-1/6">Action</th>
                <th className=" lg:hidden  w-1/6">Details</th>
              </tr>
            </thead>

            <tbody>
              {expenseList.length > 0 ? (expenseList.map((expense, index) => {
                return (<><tr className="odd:bg-[#35424a] ">
                  <td className="td_styling td_hidden ">{index + 1}</td>
                  <td className="td_styling">{expense.date}</td>
                  <td className="td_hidden td_styling">{expense.category}</td>
                  <td className="td_styling">${expense.amount}</td>
                  <td className="td_hidden td_styling">{expense.description}</td>
                  <td className="td_hidden td_styling text-wrap ">{expense.note}</td>
                  <td className="td_hidden td_styling" >
                    <div className="flex h-full items-center justify-start">
                      <button
                        className="bg-blue-400 py-1 px-[4px] text-white mx-1 font-semibold"
                        onClick={() => navigate(`/update-expense/${expense._id}`)}>edit</button>
                      <button
                        className="bg-red-400 p-1 text-white  mx-1 font-semibold"
                        onClick={() => handleDelete(expense._id, expense.userId)}>delete</button>
                    </div>
                  </td>
                  {/* For smaller screens, we show a button */}
                  <td className="lg:hidden td_styling">
                    <div className="flex justify-start">
                      <button
                        className="bg-slate-200 py-[6px] px-[10px] font-semibold text-black"
                        onClick={() => navigate(`/expense-detail/${expense._id}`)}>view</button>
                    </div>
                  </td>
                </tr></>)
              })) : (<tr className="odd:bg-[#35424a]" >
                <td className="text-center p-2 font-mono font-semibold lg:text-[1.5vw]" colSpan="8">No expense found</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end pt-2 pr-2">
          <FiRefreshCcw
            size={26}
            color="#5C5C5C"
            className=" hover:scale-110 transition-transform cursor-pointer duration-200"
            onClick={() => setToggleRefresh(prev => prev + 1)} />
        </div>
        {/* add expense button */}
        <div className="text-right absolute bottom-2 right-2">
          <Link to="/add-expense">
            <button className="bg-[#000000cb] text-white p-2 rounded-full shadow-md hover:scale-110 duration-150 hover:bg-[#000000b9]">
              <FaPlus size={50} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory