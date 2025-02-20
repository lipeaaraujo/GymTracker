import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container"

const Layout = () => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Outlet />
    </Container>
  )
}

export default Layout;