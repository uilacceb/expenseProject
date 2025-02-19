// import SearchMobile from "./SearchMobile"
import SearchDesktop from "./SearchDesktop"
import ToggleMenu from "../ToggleMenu"
import SearchMobile from "./SearchMobile"
import { useEffect, useState } from "react";
import HamburgerMenu from "../HamburgerMenu";


const Search = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (

    <div className="flex lg:h-screen h-[90%]">
      <ToggleMenu />
      <div className="flex flex-col flex-1 lg:p-0  p-4 relative">
        <HamburgerMenu />
        <div className="flex flex-col lg:max-h-screen flex-1 relative">
          {isMobile ? <SearchMobile /> : <SearchDesktop />}
        </div>
      </div>
      <HamburgerMenu />
    </div>

  )
}

export default Search