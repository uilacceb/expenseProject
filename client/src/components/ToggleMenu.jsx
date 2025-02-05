import { TbMenu2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { RiHistoryFill } from "react-icons/ri";
import { useContext } from "react";
import { ExpenseContext } from "../App";

const ToggleMenu = () => {
  const { toggleHamburger, setToggleHamburger } = useContext(ExpenseContext)
  return (
    <div className={`fixed top-0 left-0 h-screen w-screen bg-[#000000ea] transform transition-transform duration-300 ease-in-out z-50 ${toggleHamburger ? 'translate-x-0' : '-translate-x-full'} lg:w-[350px]`}>
      <button className="bg-[#B3B3B3] p-2 rounded-full hover:scale-110 duration-200 absolute top-3 left-3">
        <TbMenu2 size={24} onClick={() => setToggleHamburger(!toggleHamburger)} />
      </button>
      <div className="flex flex-col mt-20 h-screen ">
        <div className="flex items-center w-auto pl-10 mb-8 text-xl hover:scale-110 duration-150 cursor-pointer">
          <RxDashboard color="white" size={24} />
          <p className="text-white font-mono pl-4">Dashboard</p>
        </div>
        <div className="flex items-center w-auto pl-10 text-xl hover:scale-110 duration-150 cursor-pointer">
          <RiHistoryFill color="white" size={24} />
          <p className="text-white font-mono pl-4">Transaction History</p>
        </div>
      </div>
    </div>
  )
}

export default ToggleMenu