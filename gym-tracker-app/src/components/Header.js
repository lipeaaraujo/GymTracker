import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import useAuth from "../hooks/useAuth";

function Header( { handleShowNavbar } ) {
  const { auth } = useAuth();

  return (
    <header className="py-1 flex items-center justify-between">
      <button 
        className="w-fit h-fit p-1 rounded-md bg-transparent hover:bg-zinc-800 hover:cursor-pointer duration-300"
        onClick={handleShowNavbar}
      >
        <IconContext.Provider value={ { size: 28 } }>
          <GiHamburgerMenu />
        </IconContext.Provider>
      </button>
      <p className="h-fit">Welcome back <b>{auth.user.name}</b>!</p>
    </header>
  )
}

export default Header;