import { CgGym } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { BiHealth } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";

function Navbar( { show } ) {

  let location = useLocation()

  const navOptions = [
    { name: "Exercises", href: "/", logo: <CgGym /> },
    { name: "Routines", href: "/routines", logo: <CiCalendar /> },
    { name: "Personal Health", href: "/health", logo: <BiHealth /> },
  ]

  return (
    <ul 
      className={`transition-all duration-700 bg-zinc-800 h-full 
                  ${ show ? 'p-4 rounded-lg w-1/4  mr-5' 
                  : 'px-0 py-4 rounded-lg w-0 overflow-hidden'}`}>
      {navOptions.map((option) => {
        const active = location.pathname === option.href;
        return (
          <li key={option.name} className="overflow-hidden">
            <Link 
              to={option.href} 
              className={`flex items-center gap-2 min-w-fit w-full h-10 p-2 rounded-lg
                          ${ active ? 'bg-zinc-700' : 'hover:bg-zinc-700' } 
                          duration-300 hover: cursor-pointer text-nowrap`}
            >
              <IconContext.Provider value={ { size: 20 } }>
                {option.logo}
              </IconContext.Provider>
              
              {option.name}
            </Link>
          </li>
      )})}
    </ul>
  );
}

export default Navbar;