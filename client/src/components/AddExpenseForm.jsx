

const AddExpenseForm = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-[#2B363C] p-4 border-red-400 border-2 w-[90%] h-[90%] lg:w-[900px] flex justify-center items-center ">
        <form className="h-full flex">
          <fieldset className="flex flex-col items-center lg:w-[500px] w-80 overflow-hidden ">
            <legend className="text-white font-mono font-semibold">
              Add an Expense:
            </legend>

            {/* date */}
            <div className="flex flex-col m-2 lg:w-[70%] w-[90%]">
              <label htmlFor="date" className="text-white font-mono font-semibold self w-auto self-start">Date</label>
              <input type="date" id="date" name="date" className="p-1"></input>
            </div>

            {/* category */}
            <div className="flex flex-col m-2 lg:w-[70%] w-[90%] font-mono">
              <label htmlFor="category" className="text-white  font-semibold ">Category</label>
              <select name="category" id="category" className="p-1" >
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
            <div className="flex flex-col  m-2  lg:w-[70%] w-[90%]">
              <label htmlFor="amount" className="text-white font-mono font-semibold">Amount</label>
              <input type="text" id="amount" name="amount" className="p-1"></input>
            </div>

            {/* description */}
            <div className="flex flex-col  m-2  lg:w-[70%] w-[90%]">
              <label htmlFor="description" className="text-white font-mono font-semibold">Description</label>
              <input type="text" id="description" name="description" className="p-1"></input>
            </div>

            {/* note */}
            <div className="flex flex-col m-2  lg:w-[70%] w-[90%]">
              <label htmlFor="note" className="text-white font-mono font-semibold">Note</label>
              <textarea
                id="note"
                name="note"
                className="h-[150px] p-2"
              ></textarea>
            </div>

            {/* button */}
            <button className="bg-slate-300 ">add</button>
          </fieldset>
        </form>

      </div >
    </div>
  )
}

export default AddExpenseForm