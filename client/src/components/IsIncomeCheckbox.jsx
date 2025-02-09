import { useContext } from "react"
import { ExpenseContext } from "../App"


const IsIncomeCheckbox = () => {
  const { isIncome, setIsIncome } = useContext(ExpenseContext)
  return (
    <>
      <div className="flex justify-center items-center">
        <input type="checkbox"
          id="isIncome"
          className="   
          w-5 h-5
    lg:w-6 lg:h-6
    appearance-none 
    relative
    bg-white 
    checked:bg-slate-600 
    before:content-['✔']
    before:absolute
    before:hidden
    before:top-1/2
    before:left-1/2
    before:transform
    before:-translate-x-1/2
    before:-translate-y-1/2
    before:text-md
    checked:before:inline-block"
          checked={isIncome}
          onChange={(e) => setIsIncome(e.target.checked)} />
        <label htmlFor="isIncome" className="pl-2">Income</label>
      </div>
    </>
  )
}

export default IsIncomeCheckbox