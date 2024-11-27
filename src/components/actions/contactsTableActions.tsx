import React from "react";
import {
  Box,
  Button,
  Fade,
  FormControl,
  Menu,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import Link from "next/link";

interface ActionsBoxProps {
  isActionSend: boolean;
  open: boolean;
  anchorEl: HTMLElement | null;
  handleCreateNew: () => void;
  onDelete: () => void;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseMenu: () => void;
  setSearchTerm: (e: string) => void;
  sendEmail: () => void;
}

const ActionsBox: React.FC<ActionsBoxProps> = ({
  isActionSend,
  open,
  anchorEl,
  handleCreateNew,
  handleOpenMenu,
  handleCloseMenu,
  onDelete,
  setSearchTerm,
  sendEmail,
}) => {
  const buttonSize = {
    textTransform: "capitalize",
    fontWeight: "300",
    fontSize: "16px",
    " &.MuiButtonBase-root": { height: "40px" },
  };
  return (
    <Box
      sx={{
        marginTop: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column-reverse", md: "row" },
        justifyContent: "space-between",
      }}
    >
      <FormControl
        size="small"
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: "300px", lg: "400px" },
          background: "#fff",
        }}
      >
        <OutlinedInput
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>
      {!isActionSend && (
        <Box
          sx={{
            marginBottom: { xs: "20px", md: "0px" },
            display: "flex",
            justifyContent: { xs: "space-between", md: "end" },
            flexWrap: { xs: "wrap-reverse", md: "nowrap" },
            width: "100%",
            gap: { md: "9px", lg: "25px" },
            rowGap: "12px",
          }}
        >
          <Button
            sx={{
              ...buttonSize,
              background: "#DC3545",
              width: { xs: "48%", md: "83px" },
            }}
            variant="contained"
            disableElevation
            onClick={onDelete}
          >
            Delete
          </Button>
          <Box sx={{ width: { xs: "48%", md: "120px", lg: "142px" } }}>
            <Button
              fullWidth
              sx={{
                ...buttonSize,
                background: "#4E73DF",
              }}
              variant="contained"
              disableElevation
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                handleOpenMenu(event)
              }
            >
              Export to
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              elevation={0}
              onClose={handleCloseMenu}
              sx={{
                boxShadow: "none",
                "& .MuiPaper-root": {
                  width: "200px",
                  border: "solid 1px #E0E0E0",
                },
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleCloseMenu}>PDF File</MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Link
                  href="/contacts?action=export"
                  style={{ textDecoration: "none", color: "#212529" }}
                >
                  Send via Email
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Button
            sx={{
              ...buttonSize,
              width: {
                xs: "50%",
                md: "120px",
                lg: "142px",
              },
              background: "#4E73DF",
              display: { xs: "none", md: "block", lg: "block" },
            }}
            variant="contained"
            onClick={sendEmail}
            disableElevation
          >
            Send Email
          </Button>

          <Button
            sx={{
              ...buttonSize,
              width: { xs: "100%", md: "150px", lg: "200px" },
              background: { xs: "#4E73DF", md: "#28A745" },
            }}
            variant="contained"
            disableElevation
            onClick={handleCreateNew}
          >
            Create New
          </Button>
        </Box>
      )}
      {isActionSend && (
        <Fade in={isActionSend}>
          <Box
            sx={{
              display: "flex",
              gap: { xs: "10px", md: "25px" },
              justifyContent: "end",
              marginBottom: { xs: "20px", md: "0px" },
              width: "100%",
              flexWrap: { xs: "wrap", md: "nowrap" },
            }}
          >
            <FormControl
              size="small"
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: "400px" },
                background: "#fff",
              }}
            >
              <OutlinedInput placeholder="name@example.com" />
            </FormControl>
            <Button
              sx={{
                ...buttonSize,
                width: { xs: "100%", md: "142px" },
                background: "#4E73DF",
              }}
              variant="contained"
              disableElevation
            >
              Send
            </Button>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default ActionsBox;
