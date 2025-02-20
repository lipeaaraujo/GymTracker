import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Outlet />
    </Container>
    // <section className="flex justify-center items-center h-screen">
    //   <Outlet />
    // </section>
  );
};

export default PublicLayout;
