import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Balance = () => {
  return (
    <div className="flex flex-1 h-full p-3 pt-0 justify-center">
      <div className="bg-[#2B363C] relative w-[88%] h-[88%] flex justify-center">
        <div className="flex flex-col h-[100%] ">
          <p className="flex justify-center items-center text-white font-mono font-semibold h-[25%] pt-2 text-4xl lg:text-[3em]">Your balance: </p>
          <p className="text-white flex justify-center items-center font-mono font-semibold  h-[75%] text-6xl lg:text-[10rem]">$100.00</p>
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