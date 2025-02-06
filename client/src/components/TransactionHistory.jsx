import HamburgerMenu from "./HamburgerMenu"
import ToggleMenu from "./ToggleMenu"


const TransactionHistory = () => {
  return (
    <div className="flex min-h-screen">
      <ToggleMenu />
      <div className="flex flex-col flex-1">
        <HamburgerMenu />
      </div>
    </div>
  )
}

export default TransactionHistory