import { Outlet } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";
import Navbar from "../Navbar";

const AuthLayout = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <section className="p-4 w-full h-full grid grid-rows-12 overflow-x-clip">
      <Header handleShowNavbar={handleShowNavbar} />
      <section className="flex row-span-11 h-full">
        <Navbar show={showNavbar} />
        <section className="p-4 bg-zinc-800 rounded-lg w-full h-full overflow-y-auto text-wrap">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default AuthLayout;
