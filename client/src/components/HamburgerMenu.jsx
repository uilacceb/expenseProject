
import { useContext } from 'react';
import { TbMenu2 } from 'react-icons/tb'
import { ExpenseContext } from '../App';

const HamburgerMenu = () => {
  const { toggleHamburger, setToggleHamburger } = useContext(ExpenseContext);
  return (
    <button className="bg-[#B3B3B3]  p-2 rounded-full hover:scale-110 duration-200 absolute top-3 left-3 lg:hidden ">
      <TbMenu2 size="1.5em" onClick={() => setToggleHamburger(!toggleHamburger)} />
    </button>
  )
}

export default HamburgerMenu