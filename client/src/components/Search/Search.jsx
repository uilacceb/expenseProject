// import SearchMobile from "./SearchMobile"
import SearchDesktop from "./SearchDesktop"
import ToggleMenu from "../ToggleMenu"

const Search = () => {
  return (
    <div className="flex lg:h-screen h-[90%]">
      <ToggleMenu />
      <div className="flex flex-col flex-1 relative">
        <SearchDesktop />
        {/* <SearchMobile /> */}
      </div>
    </div>
  )
}

export default Search