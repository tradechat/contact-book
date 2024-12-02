import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Input from "@/components/actions/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Company } from "@/models/company";
import CountrySelect from "../actions/countrySelect";
import FormActionsButton from "../actions/formActionsButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "@/services/apiService";
import { useUser } from "@/userContext";
import { UserType } from "@/models/userType";

interface CompanyFormProps {
  company: Company;
  mode: string;
}

const CompanyForm = ({ company, mode }: CompanyFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<Company>(company);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userType } = useUser();
  const isOwner = userType === UserType.OWNER;
  const labelStyle = { fontSize: "18px", fontWeight: "400" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (mode == "view") {
      return router.replace(`/company/edite`);
    }
    setIsSubmitted(true);
    console.log(formData);
    mutation.mutate();
  };

  const mutation = useMutation({
    mutationFn: () => updateCompany(formData),
    mutationKey: ["company"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["company"],
      });
      router.push("/");
    },
  });

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
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                container
                justifyContent="space-between"
                columnGap="18px"
                spacing="20px"
              >
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      Company Name
                    </Typography>
                    <Input
                      disabled={mode == "view"}
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
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      VAT Number
                    </Typography>
                    <Input
                      disabled={mode == "view"}
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
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      Street
                    </Typography>
                    <Input
                      disabled={mode == "view"}
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
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      Street2
                    </Typography>
                    <Input
                      disabled={mode == "view"}
                      type="text"
                      name="streetTwo"
                      value={formData.streetTwo || ""}
                      label="Street2"
                      onChange={handleChange}
                    ></Input>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      City
                    </Typography>
                    <Input
                      disabled={mode == "view"}
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
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      State
                    </Typography>
                    <Input
                      disabled={mode == "view"}
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
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      Zip
                    </Typography>
                    <Input
                      disabled={mode == "view"}
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
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 5.8 }}>
                  <Box>
                    <Typography sx={{ ...labelStyle, mb: "13px" }}>
                      Country
                    </Typography>
                    <CountrySelect
                      disabled={mode == "view"}
                      value={formData.country || ""}
                      setIsSubmitted={() => {
                        setIsSubmitted(true);
                      }}
                      onChange={(value) =>
                        setFormData({ ...formData, country: value })
                      }
                      helperText={
                        isSubmitted && !formData.country
                          ? "Please enter a country name"
                          : ""
                      }
                      error={isSubmitted && !formData.country}
                    ></CountrySelect>
                  </Box>
                </Grid>

                <Grid size={12}>
                  <Box
                    sx={{
                      display: { xs: "flex", md: "block" },
                      justifyContent: "center",
                      mt: "30px",
                    }}
                  >
                    {isOwner && (
                      <FormActionsButton
                        mode={mutation.isPending ? "loading" : mode}
                      />
                    )}
                    {/* <BackButtom handleBack={handleBack} /> */}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              sx={{ display: { xs: "none", md: "flex" }, pt: "38px" }}
              size={{ xs: 12, sm: 12, md: 4 }}
              justifyContent="center"
              alignItems="start"
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "375px",
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
