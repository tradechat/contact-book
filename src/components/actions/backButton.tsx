import { Button } from "@mui/material";

interface BackButtomProps {
  handleBack: () => void;
}

const BackButtom = ({ handleBack }: BackButtomProps) => {
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleBack}
      sx={{
        textTransform: "capitalize",
        fontSize: "18px",
        fontWeight: "300",
        borderColor: "#4E73DF",
        color: "#4E73DF",
        px: "61px",
        maxWidth: "180px",
      }}
    >
      Back
    </Button>
  );
};

export default BackButtom;
