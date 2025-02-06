import Balance from "./Balance";
import HamburgerMenu from "./HamburgerMenu";


const WelcomeUser = () => {

  return (
    <>

      <div className="w-screen lg:w-auto p-4 border-red-500 border-2 h-[25%] flex justify-center items-center relative">
        <HamburgerMenu />
        <div>
          <h1 className="font-mono font-semibold text-3xl pt-4 lg:text-[50px]">Welcome username</h1>
        </div>
      </div>
      <Balance />
    </>
  )
}

export default WelcomeUser