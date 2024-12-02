import Paths from "@/components/layouts/paths";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Snackbar,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Grid from "@mui/material/Grid2";
import Input from "@/components/actions/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import { Contact } from "@/models/contact";
import Image from "next/image";
import { LockedSwitch } from "../actions/lockedSwitch";
import FormActionsButton from "../actions/formActionsButton";
import BackButtom from "../actions/backButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact, updateContact } from "@/services/apiService";
import ProfileImage from "../profileImage";
import { AxiosError } from "axios";

interface ContactFormProps {
  mode: string;
  contact: Contact;
}

const ContactForm = ({ mode, contact }: ContactFormProps) => {
  const [formData, setFormData] = useState<Contact>(contact);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(
    contact.status == "Active" ? true : false
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isErrorMsg, setIsErrorMsg] = useState<Array<string>>([]);
  const [openSnackbars, setopenSnackbars] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const labelStyle = { fontSize: "18px", fontWeight: "400" };
  const queryClient = useQueryClient();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        imageUploadFile: file,
      });
    }
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      formData.status = "Active";
    } else {
      formData.status = "Inactive";
    }

    setIsChecked(event.target.checked);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const mutation = useMutation<Contact, AxiosError>({
    mutationFn: () =>
      mode == "add" ? createContact(formData) : updateContact(formData),
    onError: (error: AxiosError) => {
      if (error.response) {
        if (error.response && error.response.status === 400) {
          const responseData = error.response.data;
          if (typeof responseData === "string") {
            setIsErrorMsg((prevErrors) => [...prevErrors, responseData]);
          }
        }
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["contact", id],
      });
      if (mode == "add") {
        return router.push("/contacts");
      }
      router.back();
    },
  });

  const handleSubmit = () => {
    if (mode == "view") {
      return router.replace(`/contacts/edite/${id}`);
    }
    setIsSubmitted(true);

    if (
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.address
    ) {
      setopenSnackbars(true);
      setIsErrorMsg([]);
      mutation.mutate();
    }
  };

  const handleCloseSnackbar = () => {
    setopenSnackbars(false);
  };

  const handleBack = () => {
    if (mode == "edite") {
      return router.replace(`/contacts/view/${id}`);
    }
    router.back();
  };

  return (
    <>
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
      <Paths name={formData.firstName + " " + formData.lastName}></Paths>
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
          title={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "20px" }}>User details</Typography>
              {mode != "add" && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography> {isChecked ? "Locked" : "Unlocked"} </Typography>
                  <LockedSwitch
                    disabled={mode == "view"}
                    checked={isChecked}
                    onChange={handleSwitchChange}
                  />
                </Box>
              )}
            </Box>
          }
          sx={{
            backgroundColor: "#F7F7F7",
            "&.MuiCardHeader-root": {
              borderRadius: "5px",
              px: { xs: "16px", md: "36px" },
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
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Grid container spacing="25px">
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "24px",
                  }}
                >
                  <Box
                    sx={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      background: "#777777",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {uploadedImage ? (
                      <Image
                        src={uploadedImage}
                        width={200}
                        height={200}
                        alt="Uploaded Image"
                        style={{ objectFit: "cover" }}
                      />
                    ) : mode !== "add" ? (
                      formData.imageUrl ? (
                        <ProfileImage url={formData.imageUrl} />
                      ) : (
                        <Image
                          src="/images/user.png"
                          width={200}
                          height={200}
                          alt="Default Profile"
                        />
                      )
                    ) : (
                      <ImageIcon sx={{ fontSize: "60px", color: "#fff" }} />
                    )}
                  </Box>
                  {mode == "add" || mode == "edite" ? (
                    <Typography
                      sx={{ opacity: ".4", color: "#000", fontSize: "18px" }}
                    >
                      JPG or PNG no larger than 5 MB
                    </Typography>
                  ) : (
                    <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                      {formData.firstName + " " + formData.lastName}
                    </Typography>
                  )}
                  {mode != "view" && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id="upload-button"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      <label htmlFor="upload-button">
                        <Button
                          variant="contained"
                          disableElevation
                          sx={{
                            fontWeight: "400",
                            marginTop: "10px",
                            fontSize: "18px",
                            textTransform: "capitalize",
                            px: "33px",
                            background: "#4E73DF",
                          }}
                          component="span"
                        >
                          Upload new image
                        </Button>
                      </label>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 8 }}>
                <Grid
                  container
                  justifyContent="space-between"
                  columnGap="18px"
                  spacing="20px"
                >
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>
                        First Name{" "}
                        <Box component="span" sx={{ color: "red" }}>
                          *
                        </Box>
                      </Typography>
                      <Input
                        disabled={mode == "view"}
                        type="text"
                        name="firstName"
                        label="First Name"
                        error={isSubmitted && !formData.firstName}
                        helperText={
                          isSubmitted && !formData.firstName
                            ? "Please enter the first name"
                            : ""
                        }
                        style={{ marginTop: "13px" }}
                        value={formData.firstName || ""}
                        onChange={handleChange}
                      ></Input>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>
                        Last name{" "}
                        <Box component="span" sx={{ color: "red" }}>
                          *
                        </Box>
                      </Typography>
                      <Input
                        disabled={mode == "view"}
                        type="text"
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName || ""}
                        error={isSubmitted && !formData.lastName}
                        helperText={
                          isSubmitted && !formData.lastName
                            ? "Please enter the last name."
                            : ""
                        }
                        style={{ marginTop: "13px" }}
                        onChange={handleChange}
                      ></Input>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>Email</Typography>
                      <Input
                        disabled={mode == "view"}
                        type="email"
                        name="email"
                        label="name@example.com"
                        value={formData.email || ""}
                        onChange={handleChange}
                        style={{ marginTop: "13px" }}
                      ></Input>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>
                        Phone{" "}
                        <Box component="span" sx={{ color: "red" }}>
                          *
                        </Box>
                      </Typography>
                      <Input
                        disabled={mode == "view"}
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber || ""}
                        label="555-123-4567"
                        error={isSubmitted && !formData.phoneNumber}
                        helperText={
                          isSubmitted && !formData.phoneNumber
                            ? "Please enter a phone number."
                            : ""
                        }
                        style={{ marginTop: "13px" }}
                        onChange={handleChange}
                      ></Input>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>Email 2</Typography>
                      <Input
                        disabled={mode == "view"}
                        type="email"
                        name="emailTwo"
                        label="name@example.com"
                        value={formData.emailTwo || ""}
                        onChange={handleChange}
                        style={{ marginTop: "13px" }}
                      ></Input>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>Mobile</Typography>
                      <Input
                        disabled={mode == "view"}
                        type="text"
                        name="mobile"
                        label="555-123-4567"
                        value={formData.mobileNumber || ""}
                        onChange={handleChange}
                        style={{ marginTop: "13px" }}
                      ></Input>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>
                        Address{" "}
                        <Box component="span" sx={{ color: "red" }}>
                          *
                        </Box>
                      </Typography>
                      <Input
                        disabled={mode == "view"}
                        type="text"
                        name="address"
                        label="Address"
                        multiline
                        maxRows={4}
                        minRows={4}
                        value={formData.address || ""}
                        onChange={handleChange}
                        style={{ marginTop: "13px" }}
                        error={isSubmitted && !formData.address}
                        helperText={
                          isSubmitted && !formData.address
                            ? "Please enter a phone number."
                            : ""
                        }
                      ></Input>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5.8 }}>
                    <Box>
                      <Typography sx={{ ...labelStyle }}>Address 2</Typography>
                      <Input
                        disabled={mode == "view"}
                        type="text"
                        name="addressTwo"
                        label="Address 2"
                        multiline
                        maxRows={4}
                        minRows={4}
                        value={formData.addressTwo || ""}
                        onChange={handleChange}
                        style={{ marginTop: "13px" }}
                      ></Input>
                    </Box>
                  </Grid>

                  <Grid size={12} sx={{ mt: "10px" }}>
                    <Box
                      sx={{
                        display: { xs: "flex", md: "block" },
                        justifyContent: "center",
                      }}
                    >
                      <FormActionsButton
                        mode={mutation.isPending ? "loading" : mode}
                      />
                      <BackButtom handleBack={handleBack} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactForm;
