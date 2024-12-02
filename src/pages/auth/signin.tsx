import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AuthLayout from "@/components/layouts/authLayout";
import Input from "@/components/actions/Input";
import PasswordInput from "@/components/actions/passwordInput";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next/client";
import { login } from "@/services/apiService";
import { AxiosError } from "axios";
import { ErrorResponse } from "./register";
import Image from "next/image";
const SignIn = () => {
  const [isErrorMsg, setIsErrorMsg] = useState<Array<string>>([]);
  const [openSnackbars, setopenSnackbars] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const userouter = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const mutation = useMutation({
    mutationFn: () => {
      return login(formData);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        if (error.response.status == 401) {
          setIsErrorMsg((prevErrors) => [
            ...prevErrors,
            "Email or password is wrong",
          ]);
        }
        if (error.response.data.errors) {
          for (const [, messages] of Object.entries(
            error.response.data.errors
          )) {
            (messages as string[]).forEach((message) => {
              setIsErrorMsg((prevErrors) => [...prevErrors, message]);
            });
          }
        }
      }
    },
    onSuccess: (data) => {
      console.log(data);
      const token = data.data.token;
      const role = data.data.role;
      setCookie("token", token);
      setCookie("role", role);
      userouter.push("/");
    },
  });

  const handleSubmit = () => {
    setopenSnackbars(true);
    setIsSubmitted(true);
    setIsErrorMsg([]);
    console.log(formData);
    mutation.mutate();
  };

  const handleCloseSnackbar = () => {
    setopenSnackbars(false);
  };

  return (
    <>
      <AuthLayout imageSize={7.3} formSize={4.7}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            width: "100%",
            maxWidth: "370px",
            pb: "30px",
          }}
        >
          {isErrorMsg.length != 0 &&
            isErrorMsg.map((error, index) => (
              <Snackbar
                key={index}
                open={openSnackbars}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert sx={{ pr: "40px" }} severity="error">
                  {error}
                </Alert>
              </Snackbar>
            ))}

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
            <Image
              style={{ margin: "auto", marginBottom: "60px", display: "block" }}
              src="/images/Logo_Vertical.svg"
              alt=""
              width="200"
              height="300"
            />
          </Box>
          <Input
            name="email"
            label="Email"
            onChange={handleChange}
            value={formData.email}
            helperText={
              isSubmitted && !formData.email ? "Please enter email" : ""
            }
            error={isSubmitted && !formData.email}
            fullWidth
            required
            onInvalid={(event) => {
              event.preventDefault();
              setIsSubmitted(true);
            }}
          />
          <Box sx={{ height: "35px" }}></Box>
          <PasswordInput
            onChange={handleChange}
            helperText={
              isSubmitted && !formData.password ? "Please enter a password" : ""
            }
            error={isSubmitted && !formData.password}
            value={formData.password}
            required
            placeholder="Password"
            onInvalid={(event) => {
              event.preventDefault();
              setIsSubmitted(true);
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "20px",
              mb: "40px",
            }}
          >
            <FormControlLabel
              control={<Checkbox sx={{ color: "#B7B7B7" }} />}
              label="Remember me"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                  color: "#212529",
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
              textTransform: "none",
              marginBottom: "30px",
              borderRadius: "5px",
              fontWeight: "400",
              background: "#4E73DF",
            }}
            variant="contained"
            disableElevation
            size="small"
            fullWidth
            type="submit"
          >
            {mutation.isPending ? "Loading..." : " Sigin in"}
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
              sx={{
                color: "#212529",
                fontSize: "15px",
                textAlign: "center",
                textDecorationColor: "#212529",
              }}
            >
              Don&apos;t have account?
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
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Link href="/auth/register">
              <Button
                variant="outlined"
                sx={{
                  width: "147px",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "400",
                  borderColor: "#4E73DF",
                  color: "#4E73DF",
                }}
                size="small"
              >
                Sign up
              </Button>
            </Link>
            {/* 
            {isErrorMsg && (
             <Typography
                sx={{
                  mt: "20px",
                  color: "red",
                  position: "absolute",
                  top: "60px",
                  left: 0,
                  width: "100%",
                  textAlign: "center",
                }}
              >

              </Typography>
            )} */}
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default SignIn;
