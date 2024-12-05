// pages/no-internet.tsx
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Box, Typography } from "@mui/material";

const NoInternet = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const updateOnlineStatus = () => setIsOnline(navigator.onLine);

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      Router.push("/");
    }
  }, [isOnline]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color="text.primary"
      sx={{
        minHeight: "calc(100vh - 300px)",
      }}
      padding={3}
    >
      <Typography variant="h1" component="h1" fontSize="2.5rem" gutterBottom>
        Opsss!
      </Typography>
      <Typography variant="body1" fontSize="1.2rem" marginBottom={2}>
        No internet connection
      </Typography>
    </Box>
  );
};

export default NoInternet;
