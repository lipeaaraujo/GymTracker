import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container"
import theme from "../../theme";

const Layout = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        backgroundColor: "background.default"
      }}
    >
      <Outlet />
    </Container>
  )
}

export default Layout;