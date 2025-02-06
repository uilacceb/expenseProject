import { RiCloseFill } from "react-icons/ri"; import { Link } from "react-router-dom";
;

const AddExpenseForm = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[#2B363C] p-4 rounded-md w-[90%] h-[90%] lg:w-[750px] lg:text-2xl flex justify-center items-center relative ">
        <Link to="/">
          <button className="bg-red-500 rounded-md p-[2px] absolute top-3 right-4"><RiCloseFill color="white" size={24} /></button>
        </Link>
        <form className="h-full flex">
          <fieldset className="flex flex-col items-center lg:w-[500px] w-80 overflow-hidden ">
            <legend className="text-white font-mono font-semibold">

            </legend>

            {/* date */}
            <div className="flex flex-col m-2 lg:w-[70%] w-[90%] lg:my-5">
              <label htmlFor="date" className="text-white mb-1 font-mono font-semibold self w-auto self-start">Date</label>
              <input type="date" id="date" name="date" className="p-1 rounded-md"></input>
            </div>

            {/* category */}
            <div className="flex flex-col m-2 lg:w-[70%] w-[90%] font-mono lg:my-5">
              <label htmlFor="category" className="text-white mb-1 font-semibold ">Category</label>
              <select name="category" id="category" className="p-2 rounded-md" >
                <option value="Grocery">Grocery</option>
                <option value="Income">Income</option>
                <option value="Travel">Travel</option>
                <option value="Gas">Gas</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Pet">Pet</option>
                <option value="Insurance">Insurance</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Medical">Medical</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* amount */}
            <div className="flex flex-col  m-2 lg:my-5  lg:w-[70%] w-[90%]">
              <label htmlFor="amount" className="text-white font-mono mb-1 font-semibold">Amount</label>
              <input type="text" id="amount" name="amount" className="p-2 rounded-md"></input>
            </div>

            {/* description */}
            <div className="flex flex-col  m-2 lg:my-5  lg:w-[70%] w-[90%]">
              <label htmlFor="description" className="text-white font-mono mb-1 font-semibold">Description</label>
              <input type="text" id="description" name="description" className="p-2 rounded-md"></input>
            </div>

            {/* note */}
            <div className="flex flex-col m-2 lg:my-5  lg:w-[70%] w-[90%]">
              <label htmlFor="note" className="text-white font-mono font-semibold mb-1">Note</label>
              <textarea
                id="note"
                name="note"
                className="h-[150px] p-2 rounded-md"
              ></textarea>
            </div>

            {/* button */}
            <div className="flex flex-col m-2 lg:w-[70%] w-[90%]">
              <button className="bg-slate-300 font-mono font-semibold self-end w-[60px] lg:w-[80px] px-2 py-1  rounded-md hover:bg-slate-400 hover:scale-105">add</button>
            </div>
          </fieldset>
        </form>

      </div >
    </div>
  )
}

export default AddExpenseForm