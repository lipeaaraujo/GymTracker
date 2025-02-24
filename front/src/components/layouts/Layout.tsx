import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container"
import theme from "../../theme";

const Layout = () => {
  return (
    <Container
      disableGutters
      sx={{
        height: "100vh",
        backgroundColor: "background.default",
        padding: 0
      }}
    >
      <Outlet />
    </Container>
  )
}

export default Layout;