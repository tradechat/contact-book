import React, { ReactNode } from "react";
import Grid, { GridSize } from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
interface AuthLayoutProps {
  children: ReactNode;
  imageSize: GridSize;
  formSize: GridSize;
}

const AuthLayout = ({ children, imageSize, formSize }: AuthLayoutProps) => {
  return (
    <>
      <Grid
        container
        sx={{ minHeight: "100vh", position: "relative", background: "#fff" }}
      >
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
            p: "40px",
            justifyContent: "center",
            alignItems: "center",
            margin: { xs: "auto" },
          }}
        >
          {children}
        </Grid>
        <Box
          sx={{
            position: "absolute",
            width: { xs: "92%", md: "100%" },
            bottom: "0",
            left: "0",
            right: "0",
            margin: "auto",
            borderTop: "solid 1px #D9D9D9",
          }}
        >
          <Grid container sx={{ width: "100%" }}>
            <Grid size={{ xs: 12, md: imageSize as GridSize }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: "50px",
                }}
              >
                <Typography
                  component="p"
                  sx={{
                    color: { xs: "#000", md: "#fff" },
                    opacity: ".6",
                    fontSize: { xs: "13px", lg: "16px" },
                  }}
                >
                  Copyright © ITM Development | Contact Book | 2022
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: { xs: "#000", md: "#fff" },
                    opacity: ".6",
                    display: {
                      xs: "none",
                      lg: imageSize != 4.5 ? "block" : "none",
                    },
                  }}
                >
                  Privacy Policy - Terms & Conditions
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 0, md: formSize as GridSize }}></Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default AuthLayout;
