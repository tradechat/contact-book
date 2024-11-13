import React, { ReactNode } from "react";
import Grid, { GridSize } from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
interface AuthLayoutProps {
  children: ReactNode;
  imageSize: Number;
  formSize: Number;
}

const AuthLayout = ({ children, imageSize, formSize }: AuthLayoutProps) => {
  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          size={{
            md: imageSize as GridSize,
          }}
          sx={{
            backgroundImage: 'url("/images/image.jpg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { md: "block", xs: "none" },
          }}
        ></Grid>
        <Grid
          size={{ md: formSize as GridSize, xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: { xs: "auto" },
          }}
        >
          {children}
        </Grid>
      </Grid>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          bottom: "0",
          borderTop: "solid 1px #D9D9D9",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "50px",
            width: "100%",
          }}
        >
          <Typography
            component="p"
            sx={{ color: "#fff", opacity: ".6", marginLeft: "100px" }}
          >
            Copyright © ITM Development | Contact Book | 2022
          </Typography>
          <Typography
            component="p"
            sx={{ color: "#fff", opacity: ".6", marginLeft: "300px" }}
          >
            Privacy Policy - Terms & Conditions
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AuthLayout;
