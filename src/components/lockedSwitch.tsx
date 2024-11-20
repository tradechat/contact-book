import { styled, Switch } from "@mui/material";

export const LockedSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 30,
  padding: 0,
  display: "flex",
  borderRadius: 100,
  "& .MuiSwitch-switchBase": {
    padding: 3.7,
    color: "#BFBFBF",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#1890ff",
        border: "none",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 21,
    height: 21,
    borderRadius: 50,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 100,
    opacity: 1,
    backgroundColor: "#F7F7F7",
    border: "2px solid #ccc",
    boxSizing: "border-box",
  },
}));
