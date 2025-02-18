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
  const { expenseList, setExpenseList, user, isLoading, setIsLoading } = useContext(ExpenseContext)
  const [toggleRefresh, setToggleRefresh] = useState(0)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(15); // items per page
  const indexOfLastExpense = currentPage * pageSize;
  const indexOfFirstExpense = indexOfLastExpense - pageSize;
  const currentExpenses = expenseList.slice(indexOfFirstExpense, indexOfLastExpense);
  const totalPages = Math.ceil(expenseList.length / pageSize);


  const [sort, setSort] = useState("default")


  // handle amount sort
  const handleSortAmount = () => {
    let sortedExpense;
    if (sort === "default" || sort === "des") {
      sortedExpense = [...expenseList].sort((a, b) => a.amount - b.amount);
      setSort("asc");
    } else if (sort === "asc") {
      sortedExpense = [...expenseList].sort((a, b) => b.amount - a.amount);
      setSort("des");
    }
    setExpenseList(sortedExpense); // Update state with sorted list
  }

  // handle date sort
  const handleSortDate = () => {
    let sortedExpense;
    if (sort === "default" || sort === "des") {
      sortedExpense = [...expenseList].sort((a, b) => new Date(a.date) - new Date(b.date)); // Oldest to newest
      setSort("asc");
    } else if (sort === "asc") {
      sortedExpense = [...expenseList].sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest to oldest
      setSort("des");
    }
    setExpenseList(sortedExpense); // Update state with sorted list
  };

  //handle category sort
  // Uses localeCompare() – Ensures proper alphabetical sorting.
  // Uses Functional setSort() – Prevents state update delays.
  const handleSortCategory = () => {
    setSort((prevSort) => {
      let sortedExpense;
      let newSort;

      if (prevSort === "default" || prevSort === "des") {
        sortedExpense = [...expenseList].sort((a, b) => a.category.localeCompare(b.category)); // Ascending
        newSort = "asc";
      } else {
        sortedExpense = [...expenseList].sort((a, b) => b.category.localeCompare(a.category)); // Descending
        newSort = "des";
      }

      setExpenseList(sortedExpense);
      return newSort; // Correctly update sort state in the next render cycle
    })
  }


  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 768) {
        setPageSize(10); // Mobile: 10 items per page
      } else {
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


  return (
    <div className="flex lg:h-screen h-[90%]">
      <ToggleMenu />
      <div className="flex flex-col flex-1 p-4 relative">
        <HamburgerMenu />
        <div className="bg-[#2B363C] text-white font-mono">
          <table className="lg:table-fixed w-full ">
            <thead className="bg-[#100f0fbf]" >
              <tr className=" h-[50px] text-left ">
                <th className="hidden lg:table-cell w-1/12">#</th>
                <th className="w-1/5 lg:text-left text-center caret-transparent">
                  <div className="flex items-center lg:justify-between justify-center lg:pr-6 pl-5 ">
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
              {isLoading ? <tr className="odd:bg-[#35424a]" >
                <td className="text-center p-2 font-mono font-semibold lg:text-[1.5vw]" colSpan="8">loading expense<img src={loadingDot} height={50} width={50} className=" inline filter invert brightness-0" /></td></tr> :

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
                  <td className="text-center p-2 font-mono font-semibold lg:text-[1.5vw]" colSpan="8">No expense found</td></tr>)
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
        <div className="text-right absolute bottom-16 right-2">
          <Link to="/add-expense">
            <button className="bg-[#000000cb] text-white p-2 rounded-full shadow-md hover:scale-110 duration-150 hover:bg-[#000000b9]">
              <FaPlus size={50} />
            </button>
          </Link>
        </div>
        {/* pagination */}
        <div className="font-semibold flex justify-center absolute left-1/2 lg:bottom-20 bottom-24 pr-10 -translate-x-1/2 p-2 rounded-md w-screen items-center lg:w-[50%] caret-transparent">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="lg:px-4 py-1 text-black rounded-md disabled:opacity-50 "
          >
            Previous
          </button>
          <span className="px-4"> Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="lg:px-4  py-1 text-black rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory