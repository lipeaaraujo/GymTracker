import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container"

const Layout = () => {
  return (
    <Container
      maxWidth={false}      
      disableGutters
      sx={{
        height: "100vh",
        backgroundColor: "background.default",
        padding: 0,
        overflowY: "hidden"
      }}
    >
      <Outlet />
    </Container>
  )
}

export default Layout;