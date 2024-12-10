import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="h-screen">
      <Outlet />
    </main>
  )
}

export default Layout;