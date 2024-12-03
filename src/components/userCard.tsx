import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
} from "@mui/material";
import { User } from "@/models/user";

interface UserCardProps {
  user: User;
  handleClick: (userId: number) => void;
  labelId: string;
  isItemSelected: boolean;
  index: number;
  handleViewUser: (id: string) => void;
}

const UserCard = ({
  user,
  handleClick,
  labelId,
  isItemSelected,
  index,
  handleViewUser,
}: UserCardProps) => {
  return (
    <Card
      onClick={() => handleViewUser(user.id!)}
      sx={{ border: "solid 1px #E0E0E0", m: "20px" }}
      elevation={0}
      key={user.id}
    >
      <CardHeader
        sx={{
          borderBottom: "solid 1px #E0E0E0",
          "&.MuiCardHeader-root": { p: "7px", pr: "16px" },
        }}
        title={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Checkbox
              sx={{ position: "relative", zIndex: "999" }}
              color="primary"
              onClick={(event) => {
                event.stopPropagation();
                handleClick(index);
              }}
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </Box>
        }
      ></CardHeader>
      <CardContent sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "10px",
          }}
        >
          <Box
            sx={{
              p: "4px",
              border: "solid 1px #E0E0E0",
              bgcolor: "#F7F7F7",
              width: "42px",
              textAlign: "center",
              borderRadius: "5px",
              color: "#787878",
              fontSize: "13px",
            }}
          >
            #{index + 1}
          </Box>
          <Box
            sx={{
              width: "70px",
              background: user.status == "Active" ? "#D4EDDA" : "#E7E8EA",
              border: `solid 1px ${
                user.status == "Active" ? "#C3E6CB" : "#DDDFE2"
              }`,
              color: user.status == "Active" ? "#155724" : "#6C757D",
              borderRadius: "5px",
              padding: "4px 0",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            {user.status}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
            {user.firstName + user.lastName}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "1px",
            width: "80%",
            bgcolor: "#E0E0E0",
            m: "10px auto",
          }}
        ></Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "18px",
              color: "#808080",
            }}
          >
            {user.email}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "18px",
              color: "#808080",
            }}
          >
            {user.phoneNumber}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
