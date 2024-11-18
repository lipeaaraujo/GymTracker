import { Outlet } from "react-router-dom";
import Header from "../Header";
import { useState } from "react";
import Navbar from "../Navbar";

const AuthLayout = () => {

  const [showNavbar, setShowNavbar] = useState(true);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  }

  return (
    <section className="p-4 h-screen flex flex-col">
      <Header handleShowNavbar={handleShowNavbar} />
      <section className="flex flex-row h-full">
        <Navbar show={showNavbar}/>
        <section className="p-4 bg-zinc-800 rounded-lg w-full h-full">
          <Outlet />
        </section>
      </section>
    </section>
  )
}

export default AuthLayout;