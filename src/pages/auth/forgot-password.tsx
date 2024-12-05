import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import AuthLayout from "@/components/layouts/authLayout";
import Input from "@/components/actions/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/apiService";
import { AxiosError } from "axios";
import { ErrorResponse } from "./register";

const ResetPassword = () => {
  const [isEmail, setIsEmail] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState<Array<string>>([]);
  const [openSnackbars, setopenSnackbars] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userouter = useRouter();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsEmail(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: () => {
      return forgotPassword({ email: isEmail });
    },
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
    onSuccess: (data) => {
      console.log(data);
      userouter.push("/auth/reset-password");
    },
  });

  const handleSubmit = () => {
    setopenSnackbars(true);
    setIsSubmitted(true);
    setIsErrorMsg([]);
    console.log(isEmail);
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
            onChange={handleChange}
            value={isEmail}
            helperText={isSubmitted && !isEmail ? "Please enter email" : ""}
            error={isSubmitted && !isEmail}
            fullWidth
            required
            onInvalid={(event) => {
              event.preventDefault();
              setIsSubmitted(true);
            }}
          ></Input>
          <Button
            sx={{
              fontSize: "20px",
              textTransform: "capitalize",
              marginTop: "35px",
              marginBottom: "57px",
              fontWeight: "400",
              background: "#4E73DF",
            }}
            variant="contained"
            disableElevation
            size="small"
            type="submit"
            fullWidth
          >
            {mutation.isPending ? "Loading..." : "Sned"}
          </Button>
          <Box sx={{ textAlign: "center", position: "relative" }}>
            <Link
              style={{
                textAlign: "center",
                color: "#4E73DF",
                fontSize: "20px",
              }}
              href="/auth/signin"
            >
              Back to login
            </Link>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default ResetPassword;
