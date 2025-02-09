import { RiCloseFill } from "react-icons/ri"
import { Link } from "react-router-dom"


const ExpenseDetailMobile = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[#2B363C] p-4 rounded-md w-[90%] h-[90%] lg:w-[750px] lg:text-2xl flex flex-col gap-[60px] justify-center items-center relative">
        <Link to="/transaction-history">
          <button className="bg-slate-600 rounded-md p-[2px] absolute top-3 right-4 hover:bg-red-500"><RiCloseFill color="white" size={24} /></button>
        </Link>
        <div className="flex flex-col  h-full gap-16">
          <div className="text-white flex font-semibold  font-mono ">
            <p className="w-[190px]" >Date:</p><p className="flex-1 text-left">2023-01-01</p>
          </div>
          <div className="text-white flex font-semibold  font-mono ">
            <p className="w-[190px]" >Category:</p><p className="flex-1 text-left">Gas</p>
          </div>
          <div className="text-white flex font-semibold font-mono">
            <p className="w-[190px]" >Amount:</p><p className="flex-1 text-left">$1000</p>
          </div>
          <div className="text-white flex font-semibold  font-mono ">
            <p className="w-[190px]">Description:</p>
            <p className="flex-1 text-left ">Costco</p>
          </div>
          <div className="text-white flex font-semibold  font-mono">
            <p className="w-[190px]">Note:</p><p className="flex-1 text-left text-wrap">This is a very long note</p>
          </div>
        </div>
        <div className="w-full text-right mb-2 mr-2">
          <Link to="/update-expense">
            <button className="font-mono rounded-md text-white bg-[#e73c3c] font-semibold px-2 py-1 mr-3">delete</button>
            <button className="font-mono rounded-md  text-white bg-[#2a65a0] font-semibold px-2 py-1 ">edit</button>

          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetailMobile