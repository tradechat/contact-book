import { Button, CircularProgress } from "@mui/material";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";

interface FormActionsButtonProps {
  mode: string;
  handleClick?: () => void;
}

const getButtonVariant = (mode: string | undefined) => {
  if (mode === "add" || mode === "edite") {
    return "contained";
  }
  return "outlined";
};

const getButtonLabel = (mode: string | undefined) => {
  if (mode === "add") {
    return "Create";
  }

  if (mode === "loading") {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-12px",
          marginLeft: "-12px",
        }}
        size="24px"
      />
    );
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

const FormActionsButton = ({ mode, handleClick }: FormActionsButtonProps) => {
  return (
    <Button
      type="submit"
      variant={getButtonVariant(mode)}
      size="small"
      onClick={handleClick}
      sx={{
        minHeight: "39.5px",
        marginRight: "18px",
        textTransform: "capitalize",
        fontSize: "18px",
        fontWeight: "400",
        maxWidth: "180px",
        width: "180px",
        color: mode == "view" ? "#4E73DF" : "#fff",
        borderColor:
          mode == "view" ? "#4E73DF" : mode == "add" ? "#4E73DF" : "",
        background:
          mode == "edite" ? "#4E73DF" : mode == "add" ? "#4E73DF" : "",
        px: "61px",
      }}
      disableElevation
    >
      {getButtonLabel(mode)}
    </Button>
  );
};

export default FormActionsButton;
