import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
} from "@mui/material";

import { Contact } from "@/models/contact";
import Image from "next/image";

interface ContactCardProps {
  contact: Contact;
  handleClick: (contactId: number) => void;
  labelId: string;
  isItemSelected: boolean;
  handleFavouriteClick: (id: number) => void;
  handleViewContact: (id: number) => void;
}

const ConatactCard = ({
  contact,
  handleClick,
  labelId,
  isItemSelected,
  handleFavouriteClick,
  handleViewContact,
}: ContactCardProps) => {
  return (
    <Card
      onClick={() => handleViewContact(contact.id)}
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
              onClick={(event) => {
                event.stopPropagation();
                handleClick(contact.id);
              }}
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
            <Button
              onClick={(event) => {
                event.stopPropagation();
                handleFavouriteClick(contact.id);
              }}
            >
              <Image
                width="28"
                height="28"
                src={
                  contact.isFavorite
                    ? "/images/star-active.png"
                    : "/images/star.png"
                }
                alt=""
              />
            </Button>
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
              minWidth: "45px",
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
              position: "relative",
              width: "58px",
              height: "58px",
            }}
          >
            <Image
              src="/images/user.png"
              alt="profile"
              className="rounded-full"
              layout="fill"
              style={{ borderRadius: "50%" }}
              objectFit="cover"
            />
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
