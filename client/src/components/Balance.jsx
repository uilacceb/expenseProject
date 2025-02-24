import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ExpenseContext } from "../App";
import loadingDot from "../assets/three-11928_256.gif";

// Months array for dropdown
const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

function Balance() {
  const {
    expenseList,
    user,
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    setShowError,
    setIsLoading,
    setFilteredList,
    filteredList,
    balance,
    isLoading,
    setBalance,
  } = useContext(ExpenseContext);

  const [error, setError] = useState("");
  const [balanceText, setBalanceText] = useState("")

  // const today = new Date().getUTCMonth() + 1;



  // Calculate the total balance whenever user or expenseList changes
  useEffect(() => {
    if (!user) return;

    const calculateBalance = () => {
      const newBalance = filteredList.reduce((sum, expense) => {
        const amount = parseFloat(expense.amount) || 0;
        return sum + amount;
      }, 0);
      setBalance(newBalance);
    };

    calculateBalance();
  }, [user, expenseList, filteredList, setBalance, selectedMonth, selectedYear]);

  // Show error message for 2 seconds, then hide automatically
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 2000);

      return () => clearTimeout(timer); // cleanup timer on unmount
    }
  }, [error, setShowError]);

  // Generate Year dropdown options (from currentYear down to 1970)
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

  const calculateBalance = () => {
    setBalanceText(`Your balance of ${selectedMonth ? MONTHS[selectedMonth - 1].label : " "} ${selectedYear}`)



    if (!user) {
      setError("Please log in to search!");
      return;
    }

    setError("");
    setIsLoading(true);

    let filteredExpenses = [];

    if (selectedMonth) {
      filteredExpenses = expenseList.filter((expense) => {
        return (
          expense.date.slice(0, 4) === String(selectedYear) &&
          expense.date.slice(5, 7) === String(selectedMonth)
        );
      });
    } else {
      filteredExpenses = expenseList.filter(
        (expense) => expense.date.slice(0, 4) === String(selectedYear)
      );
    }

    setIsLoading(false);
    setFilteredList(filteredExpenses);

    if (filteredExpenses.length === 0) {
      setError("No expense found")
      setBalance(0);
      return
    }

    const newBalance = filteredList.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return sum + amount;
    }, 0);
    setBalance(newBalance);

  };

  return (
    <>
      {/* Top row: Year/Month selectors + Search button */}
      <div className="w-full flex flex-col  caret-transparent  lg:flex-row md:flex-row lg:justify-around md:justify-around items-center">
        <div className="flex ">
          {/* Year Selector */}
          <div className="pr-6 lg:flex lg:items-center">
            <label className="font-mono font-semibold lg:pr-2">Year:</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="font-semibold px-2 py-1 border rounded bg-white lg:mr-4"
            >
              {getYearOptions()}
            </select>
          </div>

          {/* Month Selector */}
          <div className="lg:flex lg:items-center">
            <label className="font-mono font-semibold lg:pr-2">Month:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="font-semibold px-2 py-1 border rounded bg-white"
            >
              <option value="">Select a month</option>
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search button */}
        <div className="text-center flex justify-center items-center p-4">
          <button
            onClick={calculateBalance}
            className="bg-slate-700 text-white font-mono font-semibold px-5 py-1 rounded-xl hover:bg-slate-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Bottom section: Balance display + Add button */}
      <div className="flex flex-1 h-[90%] p-3 pt-0 justify-center">
        <div className="bg-[#2B363C] relative w-[88%] md:h-[70vh] h-[88%] flex justify-center">
          <div className="flex flex-col h-full w-full">
            <p className="flex justify-center items-center text-center text-white font-mono font-semibold h-[25%] pt-2 lg:text-[4vw] text-[8vw] md:text-[4vw] caret-transparent max-w-[100%]">
              {balanceText ? balanceText : "Your balance: "}
            </p>

            <p className="text-white flex justify-center items-center font-mono font-semibold w-full h-[75%] md:text-[11.9vw] lg:text-[10vw] text-[14vw] caret-transparent">
              {user ? (
                isLoading ? (
                  <span className="lg:text-[6vw] text-[6vw]">
                    Calculating
                    <img
                      src={loadingDot}
                      className="inline filter invert brightness-0 w-[10vw]"
                      alt="Loading..."
                    />
                  </span>
                ) : (
                  `$${balance.toFixed(2)}`
                )
              ) : (
                "$0.00"
              )}
            </p>

            {/* Add Expense Button */}
            <Link to="/add-expense">
              <button className="bg-[#D9D9D9] p-2 rounded-full absolute -right-5 -bottom-5 shadow-md hover:scale-105 duration-150">
                <FaPlus size={50} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Balance;