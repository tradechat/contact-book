import Paths from "@/components/paths";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Input from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import Image from "next/image";
import { Company } from "@/models/company";
import CountrySelect from "./countrySelect";

interface CompanyFormProps {
  company: Company;
}

const CompanyForm = ({ company }: CompanyFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Company>(company);

  const router = useRouter();
  const labelStyle = { fontSize: "18px", fontWeight: "400" };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Card
        sx={{
          "&.MuiCard-root": {
            borderRadius: "6px",
            border: "solid 1px #E0E0E0",
            boxShadow: "0px 3px 15px #00000012",
          },
        }}
      >
        <CardHeader
          title={<Typography sx={{ fontSize: "20px" }}>My Profile</Typography>}
          sx={{
            backgroundColor: "#F7F7F7",
            "&.MuiCardHeader-root": {
              borderRadius: "5px",
              px: "36px",
              borderBottom: "solid 1px #E0E0E0",
            },
          }}
        ></CardHeader>
        <CardContent
          sx={{
            padding: { xs: "20px", md: "45px" },
            "&.MuiCardContent-root": { paddingBottom: "40px" },
          }}
        >
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              <Grid
                component="form"
                container
                justifyContent="space-between"
                columnGap="18px"
                spacing="20px"
              >
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle }}>Company Name</Typography>
                    <Input
                      type="text"
                      name="name"
                      label="Company"
                      error={isSubmitted && !formData.name}
                      helperText={
                        isSubmitted && !formData.name
                          ? "Please enter the company name"
                          : ""
                      }
                      style={{ marginTop: "13px" }}
                      value={formData.name}
                      onChange={handleChange}
                    ></Input>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle }}>VAT Number</Typography>
                    <Input
                      type="text"
                      name="vat"
                      label="00000"
                      value={formData.vat}
                      error={isSubmitted && !formData.vat}
                      helperText={
                        isSubmitted && !formData.vat
                          ? "Please enter the VAT number."
                          : ""
                      }
                      style={{ marginTop: "13px" }}
                      onChange={handleChange}
                    ></Input>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle }}>Street</Typography>
                    <Input
                      type="email"
                      name="street"
                      label="Street"
                      value={formData.street}
                      onChange={handleChange}
                      style={{ marginTop: "13px" }}
                    ></Input>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle }}>Street2</Typography>
                    <Input
                      type="text"
                      name="street2"
                      value={formData.street2}
                      label="Street2"
                      error={isSubmitted && !formData.street2}
                      style={{ marginTop: "13px" }}
                      onChange={handleChange}
                    ></Input>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle }}>City</Typography>
                    <Input
                      type="email"
                      name="city"
                      label="City name"
                      value={formData.city}
                      onChange={handleChange}
                      style={{ marginTop: "13px" }}
                    ></Input>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle }}>State</Typography>
                    <Input
                      type="text"
                      name="state"
                      label="State"
                      value={formData.state}
                      onChange={handleChange}
                      style={{ marginTop: "13px" }}
                    ></Input>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle }}>Zip</Typography>
                    <Input
                      type="text"
                      name="zip"
                      label="0000"
                      value={formData.zip}
                      onChange={handleChange}
                      style={{ marginTop: "13px" }}
                    ></Input>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      Country
                    </Typography>
                    <CountrySelect></CountrySelect>
                  </Box>
                </Grid>

                <Grid size={12}>
                  <Box
                    sx={{
                      display: { xs: "flex", md: "block" },
                      justifyContent: "space-between",
                      mt: "20px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {}}
                      sx={{
                        marginRight: "18px",
                        textTransform: "capitalize",
                        fontSize: "18px",
                        fontWeight: "300",
                        px: "61px",
                      }}
                      disableElevation
                    >
                      <EditOffOutlinedIcon sx={{ mr: "8px" }} />
                      Edit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{ display: { xs: "none", md: "flex" } }}
              size={{ xs: 12, sm: 12, md: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "360px",
                  maxWidth: "360px",
                }}
              >
                <Image
                  src="/images/map.jpg"
                  fill
                  objectFit="cover"
                  alt=""
                ></Image>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default CompanyForm;
