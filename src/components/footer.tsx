import { Box, Container, Typography } from "@mui/material";
import React from "react";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          bottom: "0",
          borderTop: "solid 1px #D9D9D9",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "50px",
            width: "100%",
          }}
        >
          <Typography component="p" sx={{ color: "#000000", opacity: ".6" }}>
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "#000000",
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
