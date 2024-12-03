import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import EmilaInput from "../actions/emailInput";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "@/services/apiService";
import Paths from "../layouts/paths";
import { EmailData } from "@/models/email";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/pages/auth/register";

const SendEmailForm = () => {
  const router = useRouter();
  const [isErrorMsg, setIsErrorMsg] = useState<Array<string>>([]);
  const [openSnackbars, setopenSnackbars] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { email } = router.query;
  const [formData, setFormData] = useState<EmailData>({
    to: "",
    subject: "",
    body: "",
    cc: "",
    bcc: "",
  });

  useEffect(() => {
    if (typeof email === "string") {
      setFormData((prevData) => ({
        ...prevData,
        to: email,
      }));
    }
  }, [email]);

  const mutation = useMutation({
    mutationFn: () => sendEmail(formData),
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const { response } = error;
        if (response.status === 404) {
          const responseData = error.response.data;
          if (typeof responseData === "string") {
            setIsErrorMsg((prevErrors) => [...prevErrors, responseData]);
          }
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
      return router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    setIsSubmitted(true);
    setopenSnackbars(true);
    setIsErrorMsg([]);
    if (formData.to && formData.body && formData.subject) {
      mutation.mutate();
    }
  };

  const handleCloseSnackbar = () => {
    setopenSnackbars(false);
  };

  const buttonSize = {
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: "16px",
    width: {
      xs: "50%",
      md: "120px",
      lg: "142px",
    },
    " &.MuiButtonBase-root": { height: "40px" },
  };
  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
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
      <Paths></Paths>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: "20px",
          mb: "18px",
        }}
      >
        <Button
          sx={{
            ...buttonSize,
            background: "#DC3545",
          }}
          variant="contained"
          disableElevation
          onClick={() => {
            router.back();
          }}
        >
          Discard
        </Button>
        <Button
          sx={{
            ...buttonSize,
            background: "#4E73DF",
          }}
          variant="contained"
          disableElevation
          type="submit"
        >
          {mutation.isPending ? "Loading..." : "  Send Email"}
        </Button>
      </Box>
      <Paper elevation={0} sx={{ px: "50px", py: "39px" }}>
        <Grid container spacing={"30px"}>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                position: "relative",
                pl: "90px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  position: "absolute",
                  left: "-20px",
                  width: "90px",
                  textAlign: "right",
                }}
              >
                To:
              </Typography>
              <EmilaInput
                type="text"
                name="to"
                label="abc@xyz.com"
                error={isSubmitted && !formData.to}
                helperText={
                  isSubmitted && !formData.to ? "Please enter a email" : ""
                }
                value={formData.to?.toString() || ""}
                onChange={handleChange}
              ></EmilaInput>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                position: "relative",
                pl: "90px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  position: "absolute",
                  left: "-20px",
                  width: "90px",
                  textAlign: "right",
                }}
              >
                CC:
              </Typography>
              <EmilaInput
                type="text"
                name="cc"
                label="abc@xyz.com"
                value={formData.cc}
                onChange={() => {}}
              ></EmilaInput>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                position: "relative",
                pl: "90px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  position: "absolute",
                  left: "-20px",
                  width: "90px",
                  textAlign: "right",
                }}
              >
                BCC:
              </Typography>
              <EmilaInput
                type="text"
                name="bcc"
                label="abc@xyz.com"
                onChange={() => {}}
              ></EmilaInput>
            </Box>
          </Grid>
          <Grid size={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "32px",
                position: "relative",
                pl: "90px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                  position: "absolute",
                  left: "-20px",
                  width: "90px",
                  textAlign: "right",
                }}
              >
                Subject:
              </Typography>
              <EmilaInput
                type="text"
                name="subject"
                label="abc@xyz.com"
                error={isSubmitted && !formData.subject}
                helperText={
                  isSubmitted && !formData.subject ? "Please enter a email" : ""
                }
                value={formData.subject}
                onChange={handleChange}
              ></EmilaInput>
            </Box>
          </Grid>
          <Grid size={12}>
            <Box sx={{ pl: "90px" }}>
              <EmilaInput
                type="text"
                name="body"
                label="Message"
                multiline
                minRows={14}
                error={isSubmitted && !formData.body}
                helperText={
                  isSubmitted && !formData.body ? "Please enter a email" : ""
                }
                value={formData.body}
                onChange={handleChange}
              ></EmilaInput>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SendEmailForm;
