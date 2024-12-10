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
    <section className="p-4 h-full">
      <div className="flex flex-col h-full overflow-clip">
        <Header handleShowNavbar={handleShowNavbar} />
        <section className="flex h-full" >
          <Navbar show={showNavbar} />
          <main className="p-4 bg-zinc-800 rounded-lg w-full max-w-full h-full">
            <Outlet />
          </main>
        </section>
      </div>
    </section>
  );
};

export default AuthLayout;
