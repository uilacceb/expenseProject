import { Link, useNavigate } from "react-router-dom"
import HamburgerMenu from "./HamburgerMenu"
import ToggleMenu from "./ToggleMenu"
import { useContext, useEffect, useState } from "react"
import { ExpenseContext } from "../App"
import { deletingExpense, gettingAllExpense } from "../services/expenseService"
import { FaPlus } from "react-icons/fa6"
import { FiRefreshCcw } from "react-icons/fi";
import { FaSort } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import loadingDot from "../assets/three-11928_256.gif"





const TransactionHistory = () => {
  const { expenseList, user, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, setShowError, setIsLoading, setFilteredList, filteredList, setExpenseList, isLoading } = useContext(ExpenseContext)

  // const currentMonth = new Date().getMonth() + 1
  // const currentYear = new Date().getFullYear()

  const [error, setError] = useState()
  const [toggleRefresh, setToggleRefresh] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(15); // items per page


  const indexOfLastExpense = currentPage * pageSize;
  const indexOfFirstExpense = indexOfLastExpense - pageSize;



  const [sort, setSort] = useState("default")


  // handle amount sort
  const handleSortAmount = () => {
    let sortedExpense;
    if (sort === "default" || sort === "des") {
      sortedExpense = [...displayList].sort((a, b) => a.amount - b.amount);
      setSort("asc");
    } else if (sort === "asc") {
      sortedExpense = [...displayList].sort((a, b) => b.amount - a.amount);
      setSort("des");
    }

    // Update the appropriate list based on whether we're showing filtered results
    if (hasSearched) {
      setFilteredList(sortedExpense);
    } else {
      setExpenseList(sortedExpense);
    }
  };

  // handle date sort
  const handleSortDate = () => {
    let sortedExpense;
    if (sort === "default" || sort === "des") {
      sortedExpense = [...displayList].sort((a, b) => new Date(a.date) - new Date(b.date));
      setSort("asc");
    } else if (sort === "asc") {
      sortedExpense = [...displayList].sort((a, b) => new Date(b.date) - new Date(a.date));
      setSort("des");
    }

    if (hasSearched) {
      setFilteredList(sortedExpense);
    } else {
      setExpenseList(sortedExpense);
    }
  };

  // handle category sort
  const handleSortCategory = () => {
    setSort((prevSort) => {
      let sortedExpense;
      let newSort;

      if (prevSort === "default" || prevSort === "des") {
        sortedExpense = [...displayList].sort((a, b) => a.category.localeCompare(b.category));
        newSort = "asc";
      } else {
        sortedExpense = [...displayList].sort((a, b) => b.category.localeCompare(a.category));
        newSort = "des";
      }

      // Update the appropriate list based on whether we're showing filtered results
      if (hasSearched) {
        setFilteredList(sortedExpense);
      } else {
        setExpenseList(sortedExpense);
      }

      return newSort;
    });
  };


  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 768) {
        setPageSize(9); // Mobile: 10 items per page
      }
      else if (window.innerWidth >= 768 && window.innerWidth <= 1025 || window.innerHeight <= 900) {
        setPageSize(8)
      }
      else {
        setPageSize(15); // Desktop: 15 items per page
      }
    };

    updatePageSize(); // Set on first render
    window.addEventListener("resize", updatePageSize); // Listen for screen changes

    return () => {
      window.removeEventListener("resize", updatePageSize); // Cleanup on unmount
    };
  }, []);


  useEffect(() => {
    setCurrentPage(1);
  }, [filteredList]);

  useEffect(() => {
    if (!user) {
      setExpenseList('')
      return;
    }
    const fetchExpense = async () => {
      setIsLoading(true)
      try {

        const allExpense = await gettingAllExpense(user.sub);
        setExpenseList(allExpense);

      } catch (error) {
        console.error("Failed to fetch expense: ", error.message);
      }
      finally {
        setIsLoading(false)
      }
    }
    fetchExpense()
  }, [toggleRefresh, user])

  const handleDelete = async (id, userId) => {
    try {
      await deletingExpense(id, userId);
      setToggleRefresh(prev => prev + 1) //to trigger a re-fetch
    } catch (error) {
      console.error("failed to delete expense: ", error)
    }
  }


  //handle filter year and month

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
      setError("Please log in to search!");
      return;
    }

    // Reset the error message before searching
    setError("");
    setIsLoading(true)
    setHasSearched(true);
    let filteredExpenses = [];

    if (selectedMonth) {
      filteredExpenses = expenseList.filter((expense) => {
        return (
          expense.date.slice(0, 4) === String(selectedYear) &&
          expense.date.slice(5, 7) === String(selectedMonth)
        );
      });
    } else {
      filteredExpenses = expenseList.filter((expense) => {
        return expense.date.slice(0, 4) === String(selectedYear);
      });
    }

    setIsLoading(false);
    setFilteredList(filteredExpenses);

    if (filteredExpenses.length === 0) {
      setError("No expense found!");
    }
  };
  const displayList = hasSearched ? filteredList : expenseList;
  const totalPages = Math.ceil(displayList.length / pageSize); // Update this line

  // Keep the pagination slice
  const currentExpenses = displayList.slice(indexOfFirstExpense, indexOfLastExpense);



  return (
    <div className="flex lg:h-screen h-[90%]">
      <ToggleMenu />
      <div className="flex flex-col flex-1 p-4 relative">
        <HamburgerMenu />
        <div className="w-full flex flex-col md:flex-row lg:flex-row h-[20%] lg:h-auto caret-transparent mb-2  md:pl-6">
          <div className=" flex flex-1 justify-around items-center px-3 py-4 lg:w-full md:ml-20" >
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

            <div className="lg:flex lg:items-center">
              <label className="font-mono font-semibold lg:pr-2">Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="font-semibold px-2 py-1 border rounded bg-white "
              >
                <option value="">Select a month</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Search button */}
          <div className=" text-center flex justify-center items-center flex-1">
            <button
              onClick={handleSearch}
              className="bg-slate-700 text-white font-mono font-semibold px-5 py-1 rounded-xl hover:bg-slate-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <div className="bg-[#2B363C] text-white font-mono max-w-screen">
          <table className="lg:table-fixed w-full">
            <thead className="bg-[#100f0fbf]" >
              <tr className=" h-[50px] text-left ">
                <th className="hidden lg:table-cell w-1/12">#</th>
                <th className="w-1/5 lg:text-left text-center caret-transparent">
                  <div className="flex items-center lg:justify-between justify-center lg:pr-6 ">
                    Date
                    <FaSort className="cursor-pointer" onClick={handleSortDate} />
                  </div>
                </th>
                <th className="hidden lg:table-cell w-1/6">
                  <div className="flex items-center justify-between pr-6 caret-transparent">Category
                    {sort === "default" || sort === "des" ? <FaSortAlphaDown className="cursor-pointer" onClick={handleSortCategory} /> : <FaSortAlphaDownAlt className="cursor-pointer" onClick={handleSortCategory} />}
                  </div></th>
                <th className="w-1/6 caret-transparent">
                  <div className="flex items-center justify-between pr-6 ">
                    Amount
                    <FaSort className="cursor-pointer" onClick={handleSortAmount} />
                  </div>
                </th>
                <th className="hidden lg:table-cell w-1/6">Description</th>
                <th className="hidden lg:table-cell w-1/6">Note</th>
                <th className="hidden lg:table-cell w-1/6">Action</th>
                <th className=" lg:hidden  w-1/6">Details</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr className="odd:bg-[#35424a]">
                  <td className="text-center p-2 font-mono font-semibold lg:text-[1.5vw]" colSpan="8">
                    loading expense<img src={loadingDot} height={50} width={50} className="inline filter invert brightness-0" />
                  </td>
                </tr>
              ) : hasSearched && filteredList.length === 0 ? (
                <tr className="odd:bg-[#35424a]">
                  <td className="text-center p-2 font-mono font-semibold lg:text-[1.5vw] caret-transparent" colSpan="8">
                    {error ? error : "No expense found"}
                  </td>
                </tr>
              ) :

                currentExpenses.length > 0 ? (currentExpenses.map((expense, index) => {
                  return (<><tr className="odd:bg-[#35424a] ">
                    <td className="td_styling td_hidden ">{index + 1}</td>
                    <td className="td_styling">{expense.date}</td>
                    <td className="td_hidden td_styling">{expense.category}</td>
                    <td style={{ color: expense.amount > 0 ? '#22c55e' : '#ef4444' }} className="td_styling">${(expense.amount).toFixed(2)}</td>
                    <td className="td_hidden td_styling">{expense.description}</td>
                    <td className="td_hidden td_styling text-wrap ">{expense.note}</td>
                    <td className="td_hidden td_styling" >
                      <div className="flex h-full items-center justify-start">
                        <button
                          className="bg-blue-400 py-1 px-[4px] text-white mx-1 font-semibold"
                          onClick={() => navigate(`/update-expense/${expense._id}`)}>edit</button>
                        <button
                          className="bg-red-400 p-1 text-white  mx-1 font-semibold"
                          onClick={() => handleDelete(expense._id, expense.userId)}>delete</button>
                      </div>
                    </td>
                    {/* For smaller screens, we show a button */}
                    <td className="lg:hidden td_styling">
                      <div className="flex justify-start">
                        <button
                          className="bg-slate-200 py-[6px] px-[10px] font-semibold text-black"
                          onClick={() => navigate(`/expense-detail/${expense._id}`)}>view</button>
                      </div>
                    </td>
                  </tr></>)
                })) : (<tr className="odd:bg-[#35424a]" >
                  <td className="text-center p-2 font-mono font-semibold lg:text-[1.5vw] caret-transparent" colSpan="8">{error ? error : "No expense found"}</td></tr>)
              }
            </tbody>
          </table>
        </div>
        <div className="flex justify-end pt-2 pr-2">
          <FiRefreshCcw
            size={26}
            color="#5C5C5C"
            className=" hover:scale-110 transition-transform cursor-pointer duration-200"
            onClick={() => setToggleRefresh(prev => prev + 1)} />
        </div>
        {/* add expense button */}
        <div className="fixed bottom-4 right-4 z-50">
          <Link to="/add-expense">
            <button className="bg-[#000000cb] text-white p-2 rounded-full shadow-md hover:scale-110 duration-150 hover:bg-[#000000b9]">
              <FaPlus size={50} />
            </button>
          </Link>
        </div>
        {/* pagination */}
        <div className="flex font-semibold justify-center items-center py-2 px-2 w-full">
          <div className="flex items-center gap-4 caret-transparent">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="lg:px-4 py-1 text-black rounded-md disabled:opacity-50 "
            >
              Previous
            </button>
            <span className="px-4">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="lg:px-4 py-1 text-black rounded-md disabled:opacity-50 "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory