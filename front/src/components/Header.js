import { GiHamburgerMenu } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

function Header( { handleShowNavbar } ) {
  const { auth } = useAuth();
  const logout = useLogout()
  const navigate = useNavigate()

  const handleSignout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <header className="py-1 h-10 flex items-center justify-between">
      <button 
        className="w-fit h-fit p-1 rounded-md bg-transparent hover:bg-zinc-800 hover:cursor-pointer duration-300"
        onClick={handleShowNavbar}
      >
        <GiHamburgerMenu size={28}/>
      </button>
      <div className="flex items-center gap-2">
        <p className="h-fit">Welcome back <b>{auth.user.name}</b>!</p>
        <button 
          className="w-fit h-fit p-1 rounded-md bg-transparent hover:bg-zinc-800 hover:cursor-pointer duration-300"
          onClick={handleSignout}
        >
          <IoIosLogOut size={28}/>
        </button>
      </div>
    </header>
  )
}

export default Header;