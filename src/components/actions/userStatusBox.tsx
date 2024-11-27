import { Box } from "@mui/material";

interface StatuseBoxProps {
  status: string;
}

const UserStatusBox = ({ status }: StatuseBoxProps) => {
  return (
    <Box
      sx={{
        width: "90px",
        background:
          status == "Active"
            ? "#D4EDDA"
            : status == "Pending"
            ? "#FFF3CD"
            : "#F8D7DA",
        border: `solid 1px ${
          status == "Active"
            ? "#C3E6CB"
            : status == "Pending"
            ? "#FFEEBA"
            : "#F5C6CB"
        }`,
        color:
          status == "Active"
            ? "#155724"
            : status == "#Pending"
            ? "#856404"
            : "#721C24",
        borderRadius: "5px",
        padding: "4px 0",
        fontSize: "16px",
        textAlign: "center",
        margin: "auto",
      }}
    >
      {status}
    </Box>
  );
};

export default UserStatusBox;
