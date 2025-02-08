import { TbMenu2 } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { RiHistoryFill } from "react-icons/ri";
import { useContext } from "react";
import { ExpenseContext } from "../App";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { googleLogout } from '@react-oauth/google';

const ToggleMenu = () => {
  const { toggleHamburger, setToggleHamburger, user, setUser } = useContext(ExpenseContext);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    setUser(decoded)
  }

  const handleLogout = () => {
    googleLogout();
    setUser(null)
  }


  const MenuContent = () => {
    return (
      <div className="flex flex-col h-screen lg:w-[400px] ">
        {!user ? <div className="flex justify-end mb-16 pt-6 pr-4 shover:scale-110 duration-150 cursor-pointer caret-transparent">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            auto_select
            theme="filled_black"
            type="standard"
            size="medium"
            onError={() => {
              console.log('Login Failed');
            }}
          /></div> : (
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
      </div>

      {/* Desktop Menu (always visible) */}
      <div className="hidden lg:block lg:w-[400px] max-h-screen bg-[#000000ea]">
        <MenuContent />
      </div></>
  )
}

export default ToggleMenu