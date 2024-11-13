import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutPros {
  children: ReactNode;
  page: any;
}

const Layout = ({ children, page }: LayoutPros) => {
  return (
    <>
      <Box
        sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#F5F5F5" }}
      >
        {page.startsWith("/auth") ? <></> : <Navbar />}
        {!page.startsWith("/auth") ? (
          <Container maxWidth="xl" sx={{ mt: "50px" }}>
            {children}
          </Container>
        ) : (
          <Box>{children}</Box>
        )}
      </Box>
      {page.startsWith("/auth") ? <></> : <Footer />}
    </>
  );
};

export default Layout;
