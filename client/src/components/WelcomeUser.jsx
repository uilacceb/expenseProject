import { useContext } from "react";
import { ExpenseContext } from "../App";
import Balance from "./Balance";
import HamburgerMenu from "./HamburgerMenu";



const WelcomeUser = () => {
  const { user } = useContext(ExpenseContext)
  return (
    <>
      <div className="flex flex-col w-full lg:h-screen h-[90vh] justify-center items-center relative">
        <HamburgerMenu />
        <div className="h-[20%] flex items-center justify-center">
          <h1 className="font-mono font-semibold text-3xl pt-4 lg:text-[50px] caret-transparent">{user ? (`Welcome ${user.given_name}!`) : "Welcome Guest!"}</h1>
        </div>
        <div className="w-full h-full">
          <Balance />
        </div>
      </div>

    </>
  )
}

export default WelcomeUser