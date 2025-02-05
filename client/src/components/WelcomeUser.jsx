
import { useContext } from "react";
import { TbMenu2 } from "react-icons/tb";
import { ExpenseContext } from "../App";
import Balance from "./Balance";


const WelcomeUser = () => {
  const { toggleHamburger, setToggleHamburger } = useContext(ExpenseContext)
  return (
    <>

      <div className="w-screen lg:w-auto p-4 border-red-500 border-2 h-[25%] flex justify-center items-center relative">
        <button className="bg-[#B3B3B3]  p-2 rounded-full hover:scale-110 duration-200 absolute top-3 left-3 lg:hidden ">
          <TbMenu2 size="1.5em" onClick={() => setToggleHamburger(!toggleHamburger)} />
        </button>
        <div>
          <h1 className="font-mono font-semibold text-3xl pt-4 lg:text-[50px]">Welcome username</h1>
        </div>
      </div>
      <Balance />
    </>
  )
}

export default WelcomeUser