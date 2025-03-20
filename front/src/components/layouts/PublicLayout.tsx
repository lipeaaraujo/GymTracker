import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100vh",
        width: "100%",
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
