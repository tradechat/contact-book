import { Box, Button, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import AuthLayout from "@/components/authLayout";
import Input from "@/components/Input";
import Link from "next/link";

const ResetPassword = () => {
  return (
    <>
      <AuthLayout imageSize={7.3} formSize={4.7}>
        <Box component="form" sx={{ width: "100%", maxWidth: "370px" }}>
          <Typography
            component="h2"
            sx={{
              marginBottom: "47px",
              fontSize: {
                xs: "25px",
                md: "42px",
              },
              fontWeight: "700",
              color: "#212529",
            }}
          >
            Change Password
          </Typography>
          <Input
            label={"Enter your email address"}
            name="email"
            onChange={() => {}}
            value=""
          ></Input>
          <Link href="/auth/set-password">
            <Button
              sx={{
                fontSize: "20px",
                textTransform: "capitalize",
                marginTop: "50px",
                marginBottom: "55px",
                fontWeight: "400",
              }}
              variant="contained"
              disableElevation
              size="small"
              fullWidth
            >
              Send
            </Button>
          </Link>

          <Box sx={{ textAlign: "center" }}>
            <Link href="/auth/signin">Back to login</Link>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
