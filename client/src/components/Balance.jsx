import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Balance = () => {
  return (
    <div className="flex-1 border-red-500 border-2">
      <div className="bg-[#2B363C] h-[85%] m-6  border-green-500 border-2 relative">
        <div className="flex flex-col h-[100%] ">
          <p className="flex justify-center items-center text-white font-mono font-semibold h-[25%] pt-2 text-4xl lg:text-[50px]">Your balance: </p>
          <p className="text-white flex justify-center items-center font-mono font-semibold  h-[75%] text-6xl lg:text-[200px]">$100.00</p>
          {/* add expense button */}
          <Link to="/add-expense">
            <button className="bg-[#D9D9D9] p-2 rounded-full absolute  -right-6 -bottom-6 shadow-md hover:scale-105 duration-150">
              <FaPlus size={50} />
            </button>
          </Link>
        </div>

      </div>

    </div >
  )
}

export default Balance