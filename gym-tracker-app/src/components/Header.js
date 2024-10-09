import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";

function Header( { handleShowNavbar } ) {
  return (
    <header className="py-1">
      <div 
        className="w-fit h-fit p-1 rounded-md hover:bg-zinc-800 hover:cursor-pointer duration-300"
        onClick={handleShowNavbar}
      >
        <IconContext.Provider value={ { size: 28 } }>
          <GiHamburgerMenu />
        </IconContext.Provider>
      </div>
    </header>
  )
}

export default Header;