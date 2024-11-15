import { Box, Button, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import AuthLayout from "@/components/authLayout";
import PasswordInput from "@/components/passwordInput";

const SetPassword = () => {
  return (
    <>
      <AuthLayout imageSize={7.3} formSize={4.7}>
        <Box component="form" sx={{ width: "100%", maxWidth: "370px" }}>
          <Typography
            component="h2"
            sx={{
              marginBottom: "40px",
              fontSize: {
                xs: "25px",
                md: "42px",
              },
              fontWeight: "700",
              color: "#212529",
            }}
          >
            Set a Password
          </Typography>
          <PasswordInput onChange={() => {}} label="Password"></PasswordInput>
          <Box sx={{ height: "31px" }}></Box>
          <PasswordInput
            onChange={() => {}}
            label="Confirm password"
          ></PasswordInput>

          <Button
            sx={{
              fontSize: "20px",
              textTransform: "capitalize",
              marginTop: "50px",
              fontWeight: "300",
            }}
            variant="contained"
            disableElevation
            size="small"
            fullWidth
          >
            Reset Password
          </Button>
        </Box>
      </AuthLayout>
    </>
  );
};

export default SetPassword;
