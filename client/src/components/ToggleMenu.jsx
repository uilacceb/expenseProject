import { TbMenu2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { RiHistoryFill } from "react-icons/ri";
import { useContext } from "react";
import { ExpenseContext } from "../App";
import { Link } from "react-router-dom";

const ToggleMenu = () => {
  const { toggleHamburger, setToggleHamburger } = useContext(ExpenseContext);

  const MenuContent = () => {
    return (
      <div className="flex flex-col pt-20 h-screen w-screen">
        {/* link to dashboard */}
        <Link to="/" onClick={() => setToggleHamburger(false)}>
          <div className="toggleMenu-element-div">
            <RxDashboard color="white" size={24} />
            <p className="text-white font-mono pl-4">Dashboard</p>
          </div>
        </Link>
        {/* link to transaction history */}
        <Link to="/transaction-history" onClick={() => setToggleHamburger(false)}>
          <div className="toggleMenu-element-div ">
            <RiHistoryFill color="white" size={24} />
            <p className="text-white font-mono pl-4">Transaction History</p>
          </div>
        </Link>
      </div>
    )
  }
  return (
    <>
      {/* Mobile Menu (shows/hides with overlay) */}
      <div className={`lg:hidden fixed top-0 left-0 h-screen w-screen bg-[#000000ea] transform transition-transform duration-300 ease-in-out z-50 ${toggleHamburger ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="bg-[#B3B3B3] p-2 rounded-full hover:scale-110 duration-200 absolute top-3 left-3">
          <TbMenu2 size={24} onClick={() => setToggleHamburger(!toggleHamburger)} />
        </button>
        <MenuContent />
      </div>

      {/* Desktop Menu (always visible) */}
      <div className="hidden lg:block w-[350px] max-h-screen bg-[#000000ea]">
        <MenuContent />
      </div></>
  )
}

export default ToggleMenu