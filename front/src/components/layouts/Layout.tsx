import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container"
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Outlet />
      <ToastContainer />
    </Container>
  )
}

export default Layout;