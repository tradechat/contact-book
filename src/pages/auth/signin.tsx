import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";
import AuthLayout from "@/components/authLayout";
import Input from "@/components/Input";
import PasswordInput from "@/components/passwordInput";
import Link from "next/link";

const SignIn = () => {
  return (
    <>
      <AuthLayout imageSize={7.3} formSize={4.7}>
        <Box component="form" sx={{ width: "100%", maxWidth: "370px" }}>
          <Typography
            component="h2"
            sx={{
              marginBottom: "40px",
              fontSize: {
                xs: "20px",
                md: "42px",
              },
              display: { md: "block", xs: "none" },
              fontWeight: "600",
              color: "#212529",
            }}
          >
            Sign In
          </Typography>
          <Box sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
            <img
              style={{ margin: "auto", marginBottom: "60px", display: "block" }}
              src="/images/Logo_Vertical.svg"
              alt=""
            />
          </Box>
          <Input
            label={"Email"}
            name="email"
            onChange={() => {}}
            value=""
          ></Input>
          <Box sx={{ height: "25px" }}></Box>
          <PasswordInput onChange={() => {}}></PasswordInput>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />
            <Link
              href="/auth/reset-password"
              style={{
                color: "#212529",
                fontSize: "15px",
                textDecorationColor: "#212529",
              }}
            >
              Forgot Password
            </Link>
          </Box>

          <Button
            sx={{
              fontSize: "20px",
              textTransform: "capitalize",
              marginBottom: "30px",
              fontWeight: "500",
            }}
            variant="contained"
            disableElevation
            size="small"
            fullWidth
          >
            Sigin In
          </Button>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <Box
              sx={{
                height: "1px",
                backgroundColor: "#707070",
                width: "93px",
              }}
            ></Box>
            <Typography
              style={{
                color: "#212529",
                fontSize: "15px",
                textDecorationColor: "#212529",
              }}
            >
              Don't have account?
            </Typography>
            <Box
              sx={{
                height: "1px",
                backgroundColor: "#707070",
                width: "93px",
              }}
            ></Box>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Link href="/auth/register">
              <Button
                variant="outlined"
                sx={{
                  width: "147px",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "400",
                }}
                size="small"
              >
                Sign up
              </Button>
            </Link>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default SignIn;
