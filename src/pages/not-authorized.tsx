import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";

const NotAuthorized: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // للعودة إلى الصفحة السابقة
  };

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
        403 - Not Authorized
      </Typography>
      <Typography variant="body1" fontSize="1.2rem" marginBottom={2}>
        You do not have permissions to access this page.
      </Typography>
      <Button
        variant="contained"
        disableElevation
        color="primary"
        onClick={handleGoBack}
        size="large"
        sx={{ bgcolor: "#4E73DF" }}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotAuthorized;
