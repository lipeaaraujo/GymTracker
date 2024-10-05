import { CgGym } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import { BiHealth } from "react-icons/bi";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

function Navbar( { show } ) {

  const navOptions = [
    { name: "Exercises", href: "/exercises", logo: <CgGym /> },
    { name: "Routines", href: "/routines", logo: <CiCalendar /> },
    { name: "Personal Health", href: "/health", logo: <BiHealth /> },
  ]

  return (
    <ul className="transition ease-in-out delay-150 bg-zinc-800 p-4 rounded-lg w-1/4 h-full">
      {navOptions.map((option) => (
        <li key={option.name} className="">
          <Link 
            to={option.href} 
            className="flex items-center gap-2 w-full p-2 rounded-lg 
                      hover:bg-zinc-700 duration-300 hover: cursor-pointer"
          >
            <IconContext.Provider value={ { size: 20 } }>
              {option.logo}
            </IconContext.Provider>
            
            {option.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;