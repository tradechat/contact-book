import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiService";

interface LayoutPros {
  children: ReactNode;
  page: any;
}

const Layout = ({ children, page }: LayoutPros) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 61px)",
          backgroundColor: "#F5F5F5",
          position: "relative",
        }}
      >
        {page.startsWith("/auth") ? <></> : <Navbar />}
        {!page.startsWith("/auth") ? (
          <>
            <Container
              maxWidth="xl"
              sx={{
                pt: "50px",
                position: "relative",
                pb: "50px",
              }}
            >
              {children}
            </Container>
          </>
        ) : (
          <Box>{children}</Box>
        )}
      </Box>
      {page.startsWith("/auth") ? <></> : <Footer />}
    </>
  );
};

export default Layout;
