import Paths from "@/components/layouts/paths";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Input from "@/components/actions/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import { User } from "@/models/user";
import { LockedSwitch } from "../actions/lockedSwitch";
import BackButtom from "../actions/backButton";
import FormActionsButton from "../actions/formActionsButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser } from "@/services/apiService";
import { AxiosError } from "axios";

interface UserFormProps {
  mode: string;
  user: User;
}

const UserForm = ({ mode, user }: UserFormProps) => {
  console.log(user);

  const [formData, setFormData] = useState<User>(user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(
    user.status == "Locked" ? false : true
  );
  const [isErrorMsg, setIsErrorMsg] = useState<Array<string>>([]);
  const [openSnackbars, setopenSnackbars] = useState(false);
  const router = useRouter();
  const labelStyle = { fontSize: "18px", fontWeight: "400" };
  const queryClient = useQueryClient();
  const { id } = router.query;

  const mutation = useMutation<User, AxiosError>({
    mutationFn: () =>
      mode == "add" ? createUser(formData) : updateUser(formData),
    onError: (error: AxiosError) => {
      console.log(error);
      if (error.response && error.response.status === 400) {
        const responseData = error.response.data;
        if (typeof responseData === "string") {
          setIsErrorMsg((prevErrors) => [...prevErrors, responseData]);
        }
      }
    },
    onSuccess: async (data) => {
      console.log(data);

      await queryClient.invalidateQueries({
        queryKey: ["user", id],
      });
      if (mode == "add") {
        return router.replace("/users");
      }
      router.back();
    },
  });

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      formData.status = "Active";
    } else {
      formData.status = "Locked";
    }

    setIsChecked(event.target.checked);
  };

  const handleSubmit = () => {
    if (mode == "view") {
      return router.push(`/users/edite/${id}`);
    }
    console.log(formData);

    setIsSubmitted(true);
    setopenSnackbars(true);
    setIsErrorMsg([]);
    mutation.mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    router.back();
  };

  const handleCloseSnackbar = () => {
    setopenSnackbars(false);
  };

  return (
    <>
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
                  value={formData.firstName}
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
                  value={formData.lastName}
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
            <Grid size={{ xs: 12, md: 3.8 }}>
              <Box>
                <Typography sx={{ ...labelStyle }}>
                  Email{" "}
                  <Box component="span" sx={{ color: "red" }}>
                    *
                  </Box>
                </Typography>
                <Input
                  disabled={mode == "view"}
                  type="email"
                  name="email"
                  label="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={isSubmitted && !formData.email}
                  helperText={
                    isSubmitted && !formData.email
                      ? "Please enter the email."
                      : ""
                  }
                  style={{ marginTop: "13px" }}
                ></Input>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 3.8 }}>
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
                  value={formData.phoneNumber}
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

            <Grid size={{ xs: 12, md: 3.8 }}>
              <Box>
                <Typography sx={{ ...labelStyle }}>
                  User Type{" "}
                  <Box component="span" sx={{ color: "red" }}>
                    *
                  </Box>
                </Typography>

                <FormControl sx={{ marginTop: "13px" }} fullWidth size="small">
                  <Select
                    disabled={mode == "view"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.role}
                    // placeholder="Select user type"
                    name="type"
                    onChange={(e) => {
                      handleChange(e as React.ChangeEvent<HTMLInputElement>);
                    }}
                  >
                    <MenuItem value={"Owner"}>Owner</MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"User"}>User</MenuItem>
                  </Select>
                </FormControl>
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
                <FormActionsButton
                  mode={mutation.isPending ? "loading" : mode}
                />{" "}
                <BackButtom handleBack={handleBack} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserForm;
