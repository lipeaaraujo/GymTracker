import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <Outlet />
    </section>
  )
}

export default PublicLayout;