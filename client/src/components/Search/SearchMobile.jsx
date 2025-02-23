import { useContext, useEffect, useState } from "react"
import { ExpenseContext } from "../../App"
import PieChart from "./PieChart"


const SearchMobile = () => {
  const { expenseList, user, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, balanceSearch, setBalanceSearch, expenseSearch, setExpenseSearch, incomeSearch, setIncomeSearch, showError, setShowError, setIsLoading, filteredList, setFilteredList } = useContext(ExpenseContext)



  const [error, setError] = useState()

  // Generate year options from current year back to 1970
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1970; year--) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  // Months array for dropdown
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearch = () => {
    if (!user) {
      setError("Please log in to search details!");
      return;
    }

    // Reset the error message before searching
    setError("");
    setIsLoading(true)
    let filteredExpenses = [];

    // Filtered expense list if user selects both year and month
    if (selectedMonth) {
      console.log(`Expense list: ${expenseList.map(element => element.date)}`);

      filteredExpenses = expenseList.filter((expense) => {
        if (!expense.date) return false; // Prevent errors if date is missing
        console.log(`Year: ${expense.date.slice(0, 4)}, Month: ${expense.date.slice(5, 7)}`);

        return (
          expense.date.slice(0, 4) === String(selectedYear) &&
          expense.date.slice(5, 7) === String(selectedMonth)
        );
      });
    } else {
      // Filtered expense list if user didn't select a month
      filteredExpenses = expenseList.filter((expense) => {
        if (!expense.date) return false;
        console.log(`Year: ${expense.date.slice(0, 4)}, Month: ${expense.date.slice(5, 7)}`);
        return expense.date.slice(0, 4) === String(selectedYear);
      });
    }

    if (filteredExpenses.length === 0) {
      // Force an update by ensuring error state changes
      setTimeout(() => {
        setError("No expense found!");
      }, 0);

      // Reset values to 0
      setBalanceSearch(0);
      setExpenseSearch(0);
      setIncomeSearch(0);
      setFilteredList([])
      return; // Stop further execution
    }

    // If expenses are found, clear the error
    setError("");


    console.log(`Filtered expense list: ${filteredExpenses.map(element => element.date)}`);

    // Calculate income and expenses separately
    const totalIncome = filteredExpenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return amount > 0 ? sum + amount : sum;
    }, 0);

    const totalExpense = filteredExpenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return amount < 0 ? sum + Math.abs(amount) : sum;
    }, 0);

    
    setIncomeSearch(totalIncome);
    setExpenseSearch(totalExpense);
    setBalanceSearch(totalIncome - totalExpense);
    setFilteredList(filteredExpenses); 
    setIsLoading(false)
  };






  return (
    <div className="caret-transparent">
      {/* Search Controls */}
      <div className="w-full flex flex-col h-[18%]">
        <div className=" bg-white flex flex-1 justify-center items-center px-3 py-4 " >
          <div className="pr-6">
            <label className="font-mono font-semibold">Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="font-semibold px-2 py-1 border rounded bg-white"
            >
              {getYearOptions()}
            </select>
          </div>

          <div className="">
            <label className="font-mono font-semibold ">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="font-semibold px-2 py-1 border rounded bg-white"
            >
              <option value="">Select Month</option>
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Search button */}
        <div className="bg-white text-center flex justify-center items-center flex-1 pb-3">
          <button
            onClick={handleSearch}
            className="bg-slate-700 text-white font-mono font-semibold px-5 py-1 rounded-xl hover:bg-slate-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>


      {/* Chart and Stats Container */}
      <div className="flex-1 py-5 w-full">
        {/* Chart Section */}
        <div className="">
          <div className=" rounded-lg bg-[#fffefeb1] p-4 flex justify-center items-center h-[35vh]">
            {filteredList.length > 0 ? (
              <PieChart expenses={filteredList} />
            ) : (
              <p className="text-center text-lg font-mono font-semibold text-gray-600">No expenses to display</p>
            )}
            {/* <p className="flex justify-center items-center h-full text-[3vw] font-mono font-semibold"> Pie Chart Coming soon</p> */}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg caret-transparent  flex flex-col mt-4">
          <div className="flex flex-1 justify-center items-center pt-2">
            {showError ? <p className=" text-red-500 font-semibold font-mono ">{error}</p> : <h1 className="font-semibold font-mono">Monthly Summary</h1>}

          </div>
          <div className="flex flex-col p-4">
            <div className="flex justify-between items-center w-[90%] p-4">
              <h3 className="font-mono font-semibold  text-lg text-gray-700 m-0">
                Total Income:
              </h3>
              <p className="text-lg font-bold text-green-600">
                {`$${incomeSearch.toFixed(2)}`}
              </p>
            </div>
            <div className="flex justify-between items-center w-[90%] p-4">
              <h3 className="font-mono font-semibold text-lg text-gray-700 m-0">
                Total Expense:
              </h3>
              <p className="text-lg font-bold text-red-600">
                {`$${expenseSearch.toFixed(2)}`}
              </p>
            </div>

            <div className="flex items-center justify-between w-[90%] p-4">
              <h3 className="font-mono font-semibold text-lg text-gray-700 m-0">
                Balance:
              </h3>
              <p className="text-lg font-bold text-blue-600">
                {`$${balanceSearch.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default SearchMobile