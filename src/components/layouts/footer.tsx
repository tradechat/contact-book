import { Box, Container, Typography } from "@mui/material";
import React from "react";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderTop: "solid 1px #D9D9D9",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
            height: "60px",
            width: "100%",
          }}
        >
          <Typography
            component="p"
            sx={{
              color: "#000000",
              opacity: ".6",
              fontSize: { xs: "12px", sm: "18px" },
            }}
          >
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "#000000",
              fontSize: "18px",
              opacity: ".6",
              display: { xs: "none", md: "block" },
            }}
          >
            Privacy Policy - Terms & Conditions
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
