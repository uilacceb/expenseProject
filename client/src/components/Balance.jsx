import { useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ExpenseContext } from "../App";

const Balance = () => {
  const { user, expenseList, balance, setBalance } = useContext(ExpenseContext)

  useEffect(() => {
    if (!user) return;
    const calculateBalance = () => {
      setBalance(expenseList.reduce((sum, expense) => {
        const amount = parseFloat(expense.amount) || 0;
        return sum + amount;
      }, 0))
    }
    calculateBalance()
  }, [user])




  return (
    <div className="flex flex-1 h-full p-3 pt-0 justify-center">
      <div className="bg-[#2B363C] relative w-[88%] h-[88%] flex justify-center ">
        <div className="flex flex-col h-[100%]">
          <p className="flex justify-center items-center text-white font-mono font-semibold h-[25%] pt-2 lg:text-[4vw] text-[8vw] caret-transparent">Your balance: </p>
          <p className="text-white flex justify-center items-center font-mono font-semibold  h-[75%]  lg:text-[12vw] text-[18vw] caret-transparent">{user ? `$${balance.toFixed(2)}` : "$0.00"}</p>
          {/* add expense button */}
          <Link to="/add-expense">
            <button className="bg-[#D9D9D9] p-2 rounded-full absolute  -right-5 -bottom-5 shadow-md hover:scale-105 duration-150">
              <FaPlus size={50} />
            </button>
          </Link>
        </div>

      </div>

    </div >
  )
}

export default Balance