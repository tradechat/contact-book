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
import Grid from "@mui/material/Grid2";
import Input from "@/components/actions/Input";
import PasswordInput from "@/components/actions/passwordInput";
import CountrySelect from "@/components/actions/countrySelect";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { register } from "@/services/apiService";
import { AxiosError } from "axios";
import { RegisterData } from "@/models/registerData";
const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    phoneNumber: "",
    vatNumber: "",
    streetOne: "",
    streetTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [isErrorMsg, setIsErrorMsg] = useState<Array<string>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [openSnackbars, setopenSnackbars] = React.useState(false);

  const router = useRouter();
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
    mutationFn: () => register(formData),
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const { response } = error;
        if (response.status === 403) {
          setIsErrorMsg((prevErrors) => [
            ...prevErrors,
            "Email already exists",
          ]);
        }
        if (response.data.errors) {
          for (const [, messages] of Object.entries(response.data.errors)) {
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
    setopenSnackbars(true);
    setIsSubmitted(true);
    setIsErrorMsg([]);
    console.log(formData);
    mutation.mutate();
  };

  const handleCloseSnackbar = () => {
    setopenSnackbars(false);
  };

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree(event.target.checked);
  };

  const girdSize = { xs: 12, md: 5.5 };

  return (
    <>
      <AuthLayout imageSize={4.5} formSize={7.5}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            width: "100%",
            maxWidth: "806px",
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
              marginBottom: "30px",
              fontSize: {
                xs: "25px",
                md: "42px",
              },
              fontWeight: "700",
              color: "#212529",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Create Account
          </Typography>

          {/* Account details Start */}
          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              component="h2"
              sx={{
                marginBottom: "20px",
                opacity: ".4",
                fontSize: {
                  md: "26px",
                },
                color: "#212529",
              }}
            >
              Account details
            </Typography>
            <Grid container justifyContent={"space-between"} gap={3.5}>
              <Grid size={girdSize}>
                <Input
                  name="firstName"
                  label="First Name"
                  helperText={
                    isSubmitted && !formData.firstName
                      ? "Please enter a first name"
                      : ""
                  }
                  required
                  error={isSubmitted && !formData.firstName}
                  onChange={handleChange}
                  value={formData.firstName}
                  fullWidth
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  value={formData.lastName}
                  helperText={
                    isSubmitted && !formData.lastName
                      ? "Please enter a last name"
                      : ""
                  }
                  error={isSubmitted && !formData.lastName}
                  fullWidth
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
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
              </Grid>
              <Grid size={girdSize}>
                <PasswordInput
                  onChange={handleChange}
                  placeholder="Password"
                  helperText={
                    isSubmitted && !formData.password
                      ? "Please enter a password"
                      : ""
                  }
                  error={isSubmitted && !formData.password}
                  value={formData.password}
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          {/* Account details End */}

          {/* Billing details Start*/}
          <Box>
            <Typography
              component="h2"
              marginTop="50px"
              marginBottom="20px"
              sx={{
                opacity: ".4",
                fontSize: {
                  md: "26px",
                },
                color: "#212529",
              }}
            >
              Billing details
            </Typography>
            <Grid container justifyContent={"space-between"} gap={3.5}>
              <Grid size={girdSize}>
                <Input
                  name="companyName"
                  label="Company Name"
                  onChange={handleChange}
                  value={formData.companyName}
                  helperText={
                    isSubmitted && !formData.companyName
                      ? "Please enter a company name"
                      : ""
                  }
                  error={isSubmitted && !formData.companyName}
                  fullWidth
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="vatNumber"
                  label="VAT Number"
                  onChange={handleChange}
                  value={formData.vatNumber}
                  helperText={
                    isSubmitted && !formData.vatNumber
                      ? "Please enter a VAT numver"
                      : ""
                  }
                  error={isSubmitted && !formData.vatNumber}
                  fullWidth
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="streetOne"
                  label="Street"
                  onChange={handleChange}
                  value={formData.streetOne}
                  helperText={
                    isSubmitted && !formData.streetOne
                      ? "Please enter a street name"
                      : ""
                  }
                  error={isSubmitted && !formData.streetOne}
                  fullWidth
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="city"
                  label="City"
                  onChange={handleChange}
                  value={formData.city}
                  helperText={
                    isSubmitted && !formData.city
                      ? "Please enter a city name"
                      : ""
                  }
                  error={isSubmitted && !formData.city}
                  fullWidth
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="state"
                  label="State"
                  onChange={handleChange}
                  value={formData.state}
                  helperText={
                    isSubmitted && !formData.state
                      ? "Please enter a state name"
                      : ""
                  }
                  error={isSubmitted && !formData.state}
                  fullWidth
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="zip"
                  label="Zip"
                  onChange={handleChange}
                  value={formData.zip}
                  helperText={
                    isSubmitted && !formData.zip
                      ? "Please enter a zip number"
                      : ""
                  }
                  error={isSubmitted && !formData.zip}
                  fullWidth
                  required
                  onInvalid={(event) => {
                    event.preventDefault();
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
              <Grid size={girdSize}>
                <CountrySelect
                  value={formData.country}
                  onChange={(value) =>
                    setFormData({ ...formData, country: value })
                  }
                  helperText={
                    isSubmitted && !formData.country
                      ? "Please enter a country name"
                      : ""
                  }
                  error={isSubmitted && !formData.country}
                  setIsSubmitted={() => {
                    setIsSubmitted(true);
                  }}
                />
              </Grid>
            </Grid>
            {/* Billing details End*/}

            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "#B7B7B7" }}
                  checked={isAgree}
                  onChange={handleChangeCheckBox}
                />
              }
              label="I agree to the website terms and conditions"
              sx={{
                marginTop: "20px",
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                  color: isSubmitted && !isAgree ? "#d32f2f" : "#212529",
                },
              }}
            />
          </Box>
          <Button
            sx={{
              fontSize: "20px",
              textTransform: "none",
              marginBottom: "30px",
              marginTop: "40px",
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
            {mutation.isPending ? "Loading..." : "Register"}
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link
              style={{ color: "#4E73DF", fontSize: "20px" }}
              href="/auth/signin"
            >
              Sign in instead
            </Link>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Register;

export interface ErrorResponse {
  status: number;
  errors: Record<string, string[]>;
}
