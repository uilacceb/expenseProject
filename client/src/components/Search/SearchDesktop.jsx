
import { useContext, useEffect, useState } from "react";
import PieChart from "./PieChart";
import { ExpenseContext } from "../../App"

const SearchDesktop = () => {
  const { expenseList, user, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, balanceSearch, setBalanceSearch, expenseSearch, setExpenseSearch, incomeSearch, setIncomeSearch, showError, setShowError, setIsLoading } = useContext(ExpenseContext)



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
      setError("Please log in to add expenses!");
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

    // Set values
    setIncomeSearch(totalIncome);
    setExpenseSearch(totalExpense);
    setBalanceSearch(totalIncome - totalExpense);

    setIsLoading(false)
  };






  return (
    <div className="h-full w-full flex flex-col caret-transparent">
      {/* Search Controls */}
      <div className="flex justify-around items-center p-4 bg-white">
        <div className="flex items-center">
          <label className="font-mono font-semibold text-lg pr-5">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="font-semibold px-2 py-1 border rounded bg-white"
          >
            {getYearOptions()}
          </select>
        </div>

        <div className="flex items-center">
          <label className="font-mono font-semibold text-lg pr-5">Month:</label>
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

        <button
          onClick={handleSearch}
          className="bg-slate-700 text-white font-mono font-semibold px-6 py-2 rounded-xl hover:bg-slate-600 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Chart and Stats Container */}
      <div className="flex-1 min-h-0 flex p-4 m-8">
        {/* Chart Section */}
        <div className="w-3/5 h-full pr-4">
          <div className="h-full rounded-lg shadow-lg bg-[#dcdcdc] p-4">
            {/* <PieChart /> */}
            <p className="flex justify-center items-center h-full text-[3vw] font-mono font-semibold"> Pie Chart Coming soon</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-2/5 bg-white rounded-lg shadow-lg p-6 caret-transparent  flex flex-col">
          <div className="flex flex-1 justify-center items-center">
            {showError ? <p className=" text-red-500 font-semibold font-mono text-[1.1vw]">{error}</p> : <h1 className="text-center text-[1.3vw] font-semibold font-mono">Monthly Summary</h1>}

          </div>
          <div className=" flex flex-col h-[90%] justify-evenly p-4">
            <div className="border-b pb-4">
              <h3 className="font-mono font-semibold text-lg text-gray-700 mb-2">
                Total Income
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {`$${incomeSearch.toFixed(2)}`}
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-mono font-semibold text-lg text-gray-700 mb-2">
                Total Expense
              </h3>
              <p className="text-2xl font-bold text-red-600">
                {`$${expenseSearch.toFixed(2)}`}
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-mono font-semibold text-lg text-gray-700 mb-2">
                Balance
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {`$${balanceSearch.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDesktop;