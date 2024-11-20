import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AuthLayout from "@/components/authLayout";
import Grid from "@mui/material/Grid2";
import Input from "@/components/Input";
import PasswordInput from "@/components/passwordInput";
import CountrySelect from "@/components/countrySelect";
import Link from "next/link";
import { RegisterData } from "@/models/register";

const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    companyName: "",
    vatNumber: "",
    streetOne: "",
    streetTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSumit = () => {
    setIsSubmitted(true);
    console.log("Form Data:", formData);
  };

  const girdSize = { xs: 12, md: 5.5 };

  return (
    <>
      <AuthLayout imageSize={4.5} formSize={7.5}>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSumit();
          }}
          sx={{
            width: "100%",
            maxWidth: "806px",
            pb: "30px",
          }}
        >
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
                  onChange={handleChange}
                  value={formData.firstName}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="lastName"
                  label="Last Name"
                  onChange={handleChange}
                  value={formData.lastName}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  value={formData.email}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <PasswordInput
                  label="Password"
                  onChange={handleChange}
                  value={formData.password}
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
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="vatNumber"
                  label="VAT Number"
                  onChange={handleChange}
                  value={formData.vatNumber}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="streetOne"
                  label="Street"
                  onChange={handleChange}
                  value={formData.streetOne}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="streetTwo"
                  label="Street 2 (Optional)"
                  onChange={handleChange}
                  value={formData.streetTwo}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="city"
                  label="City"
                  onChange={handleChange}
                  value={formData.city}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="state"
                  label="State"
                  onChange={handleChange}
                  value={formData.state}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <Input
                  name="zip"
                  label="Zip"
                  onChange={handleChange}
                  value={formData.zip}
                  fullWidth
                />
              </Grid>
              <Grid size={girdSize}>
                <CountrySelect
                  value={formData.country}
                  onChange={(value) =>
                    setFormData({ ...formData, country: value })
                  }
                />
              </Grid>
            </Grid>
            {/* Billing details End*/}

            <FormControlLabel
              control={<Checkbox sx={{ color: "#B7B7B7" }} />}
              label="I agree to the website terms and conditions"
              sx={{
                marginTop: "20px",
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                  color: "#212529",
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
              fontWeight: "300",
              background: "#4E73DF",
            }}
            variant="contained"
            disableElevation
            size="small"
            fullWidth
            type="submit"
          >
            Register
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
