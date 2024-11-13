import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React from "react";
import AuthLayout from "@/components/authLayout";
import Grid from "@mui/material/Grid2";
import Input from "@/components/Input";
import PasswordInput from "@/components/passwordInput";
import CountrySelect from "@/components/countrySelect";
import Link from "next/link";
const Register = () => {
  return (
    <>
      <AuthLayout imageSize={4.5} formSize={7.5}>
        <Box component="form" sx={{ width: "100%", maxWidth: "806px" }}>
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
            }}
          >
            Create Account
          </Typography>
          {/* Account details Start */}
          <Box sx={{ marginBottom: "10px" }}>
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
              <Grid size={5.5}>
                <Input
                  name="first-name"
                  label="First Name"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="last-name"
                  label="Last Name"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="email"
                  label="Email"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <PasswordInput onChange={() => {}}></PasswordInput>
              </Grid>
            </Grid>
          </Box>
          {/* Account details End */}

          {/* Billing details Start*/}
          <Box>
            <Typography
              component="h2"
              marginTop="30px"
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
              <Grid size={5.5}>
                <Input
                  name="company-name"
                  label="Company Name"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="vat-number"
                  label="VAT Number"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="street"
                  label="Street"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="street2"
                  label="Street 2 (Optional)"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="city"
                  label="City"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="state"
                  label="State"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <Input
                  name="zip"
                  label="Zip"
                  onChange={() => {}}
                  fullWidth={true}
                ></Input>
              </Grid>
              <Grid size={5.5}>
                <CountrySelect></CountrySelect>
              </Grid>
            </Grid>
            {/* Billing details End*/}

            <FormControlLabel
              control={<Checkbox />}
              label="I agree to the website terms and conditions"
              sx={{
                marginTop: "20px",
                "& .MuiFormControlLabel-label": {
                  fontSize: "16px",
                },
              }}
            />
          </Box>
          <Button
            sx={{
              fontSize: "20px",
              textTransform: "capitalize",
              marginBottom: "30px",
              marginTop: "30px",
              fontWeight: "400",
            }}
            variant="contained"
            disableElevation
            size="small"
            fullWidth
          >
            Register
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Link href="/auth/signin">Sign in instead</Link>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
};

export default Register;
