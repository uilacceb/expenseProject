import { Link } from "react-router-dom"
import HamburgerMenu from "./HamburgerMenu"
import ToggleMenu from "./ToggleMenu"
import { useContext, useEffect } from "react"
import { ExpenseContext } from "../App"
import { gettingAllExpense } from "../services/expenseService"



const TransactionHistory = () => {
  const { expenseList, setExpenseList, user } = useContext(ExpenseContext)
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
  })

  return (
    <div className="flex min-h-screen ">
      <ToggleMenu />
      <div className="flex flex-col flex-1  p-4">
        <HamburgerMenu />
        <div className="bg-[#2B363C] text-white font-mono">
          <table className="table-fixed w-full ">
            <thead className="bg-[#100f0fbf]" >
              <tr className="border-b-[1px] h-[50px] border-white text-left ">
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
              {expenseList.map((expense, index) => {
                return (<><tr className="odd:bg-[#35424a] ">
                  <td className="td_styling td_hidden ">{index + 1}</td>
                  <td className="td_styling">{expense.date}</td>
                  <td className="td_hidden td_styling">{expense.category}</td>
                  <td className="td_styling">{expense.amount}</td>
                  <td className="td_hidden td_styling">{expense.description}</td>
                  <td className="td_hidden td_styling text-wrap ">{expense.note}</td>
                  <td className="td_hidden td_styling" >
                    <div className="flex h-full items-center justify-center">
                      <Link to="/update-expense">
                        <button className="bg-blue-400 py-1 px-[4px] text-white mx-1 font-semibold">edit</button></Link>
                      <button className="bg-red-400 p-1 text-white  mx-1 font-semibold">delete</button>
                    </div>
                  </td>
                  {/* For smaller screens, we show a button */}
                  <td className="lg:hidden td_styling">
                    <Link to="/expense-detail">
                      <div className="flex justify-start">
                        <button className="bg-slate-200 py-[6px] px-[10px] font-semibold text-black ">view</button>
                      </div>
                    </Link>
                  </td>
                </tr></>)
              })}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default TransactionHistory