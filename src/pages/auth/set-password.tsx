import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import AuthLayout from "@/components/layouts/authLayout";
import PasswordInput from "@/components/actions/passwordInput";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { setPassword } from "@/services/apiService";
import { AxiosError } from "axios";
import { ErrorResponse } from "./register";
const SetPassword = () => {
  const [isPassword, setIsPassword] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState<Array<string>>([]);
  const [openSnackbars, setopenSnackbars] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { id, code } = router.query;
  const idNumber = id ? Number(id) : 0;
  const codeString = Array.isArray(code) ? code[0] : code;

  const mutation = useMutation({
    mutationFn: () =>
      setPassword(
        {
          password: isPassword,
        },
        idNumber!,
        codeString!
      ),
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        if (error.response.status == 404) {
          setIsErrorMsg((prevErrors) => [...prevErrors, error.message]);
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
    onSuccess: () => {
      router.push("/auth/signin");
    },
  });

  const handleSubmit = () => {
    setIsErrorMsg([]);
    setopenSnackbars(true);
    setIsSubmitted(true);

    if (isPassword == isConfirmPassword) {
      mutation.mutate();
    }
  };

  const handleCloseSnackbar = () => {
    setopenSnackbars(false);
  };

  const getHelperText = () => {
    if (isSubmitted && !isConfirmPassword) {
      return "Please enter a confirm password";
    } else if (isSubmitted && isPassword !== isConfirmPassword) {
      return "Password does not match";
    }
    return "";
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
          sx={{ width: "100%", maxWidth: "370px" }}
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
                xs: "25px",
                md: "42px",
              },
              fontWeight: "700",
              color: "#212529",
            }}
          >
            Set a Password
          </Typography>
          <PasswordInput
            value={isPassword}
            placeholder="Password"
            onChange={(e) => {
              setIsPassword(e.target.value);
            }}
            helperText={
              isSubmitted && !isPassword ? "Please enter a password" : ""
            }
            error={isSubmitted && !isPassword}
            required
            onInvalid={(event) => {
              event.preventDefault();
              setIsSubmitted(true);
            }}
          ></PasswordInput>
          <Box sx={{ height: "31px" }}></Box>
          <PasswordInput
            value={isConfirmPassword}
            placeholder="Confirm password"
            onChange={(e) => {
              setIsConfirmPassword(e.target.value);
            }}
            helperText={getHelperText()}
            error={isSubmitted && !isConfirmPassword}
            required
            onInvalid={(event) => {
              event.preventDefault();
              setIsSubmitted(true);
            }}
          ></PasswordInput>

          <Button
            sx={{
              fontSize: "20px",
              textTransform: "none",
              marginBottom: "33px",
              borderRadius: "5px",
              marginTop: "35px",
              fontWeight: "300",
              background: "#4E73DF",
            }}
            variant="contained"
            disableElevation
            size="small"
            type="submit"
            fullWidth
          >
            {mutation.isPending ? "Loading..." : " Reset Password"}
          </Button>
        </Box>
      </AuthLayout>
    </>
  );
};

export default SetPassword;
