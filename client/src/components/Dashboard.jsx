import { TbMenu2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { RiHistoryFill } from "react-icons/ri";
import { useState } from "react";

const Dashboard = () => {
  const [toggleHamburger, setToggleHamburger] = useState(false)
  return (
    <>
      <div className="flex flex-col h-screen relative">

        {/* Welcome Text */}
        <div className="w-screen p-4 border-red-500 border-2 h-[25%] flex justify-center items-center relative">
          <button className="bg-[#B3B3B3]  p-2 rounded-full hover:scale-110 duration-200 absolute top-3 left-3">
            <TbMenu2 size="1.5em" onClick={() => setToggleHamburger(!toggleHamburger)} />
          </button>
          <div>
            <h1 className="font-mono font-semibold text-3xl pt-4">Welcome username</h1>
          </div>
        </div>
        {/* toggle menu */}
        <div
          className={`fixed top-0 left-0 h-screen w-screen bg-[#000000ea] transform transition-transform duration-300 ease-in-out ${toggleHamburger ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <button className="bg-[#B3B3B3] p-2 rounded-full hover:scale-110 duration-200 absolute top-3 left-3">
            <TbMenu2 size={24} onClick={() => setToggleHamburger(!toggleHamburger)} />
          </button>
          <div className="flex flex-col mt-20 h-screen">
            <div className="flex items-center w-screen pl-10 mb-8 text-xl hover:scale-110 duration-150 border-green-500 border-2">
              <RxDashboard color="white" size={24} />
              <p className="text-white font-mono pl-4">Dashboard</p>
            </div>
            <div className="flex items-center w-screen pl-10 text-xl hover:scale-110 duration-150 border-green-500 border-2">
              <RiHistoryFill color="white" size={24} />
              <p className="text-white font-mono pl-4">Transaction History</p>
            </div>
          </div>
        </div>
        {/* Balance Section */}
        <div className="h-screen  border-red-500 border-2">
          <div className="bg-[#2B363C] h-[85%] m-6  border-green-500 border-2">
            <div className="flex flex-col h-[100%] ">
              <p className="flex justify-center items-center text-white font-mono font-semibold h-[25%] pt-2 text-4xl  border-red-500 border-2">Your balance: </p>
              <p className="text-white flex justify-center items-center font-mono font-semibold  h-[75%] text-6xl  border-red-500 border-2">$100.00</p>
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default Dashboard