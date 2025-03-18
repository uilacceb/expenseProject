import { TbMenu2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { RiHistoryFill } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { useContext, useEffect } from "react";
import { ExpenseContext } from "../App";
import { Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { gettingAllExpense } from "../services/expenseService";
// import Footer from "./Footer";

const ToggleMenu = () => {
  const { toggleHamburger, setToggleHamburger, user, setUser, setExpenseList, setIsLoading, setSelectedYear, setSelectedMonth, setBalanceSearch, setExpenseSearch, setIncomeSearch, setShowError, setFilteredList } = useContext(ExpenseContext);

  useEffect(() => {
    if (!user) return;
    const fetchAllExpense = async () => {
      const allExpense = await gettingAllExpense(user.sub)
      setExpenseList(allExpense)
    }
    fetchAllExpense();
  }, [user])

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    setUser(decoded)
  }

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    setIsLoading(false)
    setSelectedYear(new Date().getFullYear())
    setSelectedMonth('')
    setIncomeSearch(0)
    setBalanceSearch(0)
    setExpenseSearch(0)
    setShowError(false)
    setFilteredList([])

  }


  const MenuContent = () => {
    return (
      <div className="flex flex-col h-screen lg:w-[400px]  caret-transparent">
        {!user ? <div className="flex justify-end mb-16 pt-6 pr-4 shover:scale-110 duration-150 cursor-pointer caret-transparent">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            auto_select={true}
            theme="filled_black"
            type="standard"
            size="medium"
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div> : (
          <>
            <div className='flex  justify-end pr-6 pt-8'>
              <img src={user.picture} className="h-6 w-6 rounded-lg" />
              <button className="text-[#fff] ml-2" onClick={handleLogout}>Log out</button>
            </div>
            <div className="flex justify-center mb-16 pt-12 pr-4 text-2xl font-bold caret-transparent"><p className="text-[#fff] font-mono ">Hello {user.given_name}!</p>
            </div>

          </>)
        }



        {/* link to dashboard */}
        <Link to="/" onClick={() => setToggleHamburger(false)}>
          <div className="toggleMenu-element-div ">
            <RxDashboard color="white" size={24} />
            <p className="text-white font-mono pl-4">Dashboard</p>
          </div>
        </Link>
        {/* link to transaction history */}
        <Link to="/transaction-history" onClick={() => setToggleHamburger(false)}>
          <div className="toggleMenu-element-div ">
            <RiHistoryFill color="white" size={24} />
            <p className="text-white font-mono pl-4">Transaction History</p>
          </div>
        </Link>
        <Link to="/search" onClick={() => setToggleHamburger(false)}>
          <div className="toggleMenu-element-div ">
            <HiOutlineSearch color="white" size={24} />
            <p className="text-white font-mono pl-4">Search</p>
          </div>
        </Link>
      </div>
    )
  }
  return (
    <>
      {/* Mobile Menu (shows/hides with overlay) */}
      <div className={`lg:hidden fixed top-0 left-0 h-screen w-screen bg-[#000000ea] transform transition-transform duration-300 ease-in-out z-50 ${toggleHamburger ? 'translate-x-0' : '-translate-x-full'}`}>
        <button className="bg-[#B3B3B3] p-2 rounded-full hover:scale-110 duration-200 absolute top-3 left-3">
          <TbMenu2 size={24} onClick={() => setToggleHamburger(!toggleHamburger)} />
        </button>
        <MenuContent />
        <div className="absolute right-3 bottom-3 text-center">
          <a href="https://buymeacoffee.com/uilacceb" target="_blank">
            <button className="bg-slate-500 font-mono text-white p-2 text-center rounded-md hover:bg-slate-700">Buy my cat a can 😽</button></a>
        </div>
      </div>

      {/* Desktop Menu (always visible) */}
      <div className="hidden lg:block lg:w-[400px] max-h-screen bg-[#000000ea] relative">
        <MenuContent />
        <div className="absolute right-3 bottom-3 text-center">
          <a href="https://buymeacoffee.com/uilacceb" target="_blank">
            <button className="bg-slate-500 font-mono text-white p-2 text-center rounded-md hover:bg-slate-700">Buy my cat a can 😽</button></a>
        </div>
      </div>
      {/* <div className="absolute lg:bottom-3 pl-14 bottom-1">
        <Footer />
      </div> */}

    </>
  )
}

export default ToggleMenu