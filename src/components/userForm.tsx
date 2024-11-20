import Paths from "@/components/paths";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Input from "@/components/Input";
import { useState } from "react";
import { useRouter } from "next/router";
import { User } from "@/models/user";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import { LockedSwitch } from "./lockedSwitch";

interface UserFormProps {
  mode: string;
  user: User;
  id: number;
}

const UserForm = ({ mode, user, id }: UserFormProps) => {
  const [formData, setFormData] = useState<User>(user);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const labelStyle = { fontSize: "18px", fontWeight: "400" };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleClick = () => {
    if (mode == "view") {
      router.push(`/users/user/?mode=edite&id=${id}`);
    }
    setIsSubmitted(true);
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      return;
    }
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    router.back();
  };
  const getButtonVariant = (mode: string | undefined) => {
    if (mode === "add" || mode === "edite") {
      return "contained";
    }
    return "outlined";
  };

  const getButtonLabel = (mode: string | undefined) => {
    console.log(mode);

    if (mode === "add") {
      return "Create";
    }
    if (mode === "view") {
      return (
        <>
          <EditOffOutlinedIcon sx={{ mr: "8px" }} />
          Edit
        </>
      );
    }
    return "Save";
  };

  return (
    <>
      <Paths name={formData.firstName + formData.lastName}></Paths>
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
                  type="email"
                  name="email"
                  label="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
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
                  type="text"
                  name="phone"
                  value={formData.phone}
                  label="555-123-4567"
                  error={isSubmitted && !formData.phone}
                  helperText={
                    isSubmitted && !formData.phone
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
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.type}
                    placeholder="Select user type"
                    name="type"
                    onChange={handleChange}
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
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
                <Button
                  variant={getButtonVariant(mode)}
                  size="small"
                  onClick={handleClick}
                  sx={{
                    marginRight: "18px",
                    textTransform: "capitalize",
                    fontSize: "18px",
                    fontWeight: "300",
                    px: "61px",
                  }}
                  disableElevation
                >
                  {getButtonLabel(mode)}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "18px",
                    fontWeight: "300",
                    px: "61px",
                  }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default UserForm;
