import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
} from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Contact } from "@/models/contact";
import Image from "next/image";

interface ContactCardProps {
  contact: Contact;
  handleClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    contactId: number
  ) => void;
  labelId: string;
  isItemSelected: boolean;
}

const ConatactCard = ({
  contact,
  handleClick,
  labelId,
  isItemSelected,
}: ContactCardProps) => {
  return (
    <Card
      sx={{ border: "solid 1px #E0E0E0", m: "20px" }}
      elevation={0}
      key={contact.id}
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
              onClick={(event) => handleClick(event, contact.id)}
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
            {contact.isFavorite ? (
              <StarBorderRoundedIcon />
            ) : (
              <StarRateRoundedIcon sx={{ color: "#FC0" }} />
            )}
          </Box>
        }
      ></CardHeader>
      <CardContent sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute",
            width: "90%",
            left: 0,
            right: 0,
            m: "auto",
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
            #{contact.id}
          </Box>
          <Box
            sx={{
              width: "70px",
              background: contact.status == "Active" ? "#D4EDDA" : "#E7E8EA",
              border: `solid 1px ${
                contact.status == "Active" ? "#C3E6CB" : "#DDDFE2"
              }`,
              color: contact.status == "Active" ? "#155724" : "#6C757D",
              borderRadius: "5px",
              padding: "4px 0",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            {contact.status}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              width="80"
              height="80"
              src="/images/Person.png"
              alt=""
            ></Image>
          </Box>
          <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
            {contact.firstName + contact.lastName}
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
            {contact.email}
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "18px",
              color: "#808080",
            }}
          >
            {contact.phoneNumber}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConatactCard;
