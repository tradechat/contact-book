// components/DrawerComponent.tsx
import React from "react";
import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import Image from "next/image";

interface DrawerProps {
  pages: { name: string; path: string }[];
  userProfileOpen: boolean;
  handleDrawerToggle: () => void;
  handleUserProfileClick: () => void;
  userName: string;
  userId: string;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  pages,
  userProfileOpen,
  handleDrawerToggle,
  handleUserProfileClick,
  userName,
  userId,
}) => {
  return (
    <Box>
      <Box sx={{ background: "#4E73DF" }}>
        <Toolbar disableGutters sx={{ height: "82px", paddingLeft: "28px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/">
              <Image
                src="/images/Logo_White.svg"
                width="170"
                height="40"
                alt=""
              />
            </Link>
          </Box>
          <Box>
            <Button size="small" onClick={handleDrawerToggle}>
              <CloseIcon sx={{ color: "#fff", fontSize: "28px" }} />
            </Button>
          </Box>
        </Toolbar>
      </Box>
      <List>
        {pages.map((item, index) => (
          <Box key={index}>
            <ListItem onClick={handleDrawerToggle} disablePadding>
              <ListItemButton sx={{ textAlign: "left" }}>
                <Link
                  href={item.path}
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    width: "100%",
                  }}
                >
                  <ListItemText primary={item.name} />
                </Link>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ borderColor: "#ced4da" }} />
          </Box>
        ))}

        {userName && (
          <ListItemButton onClick={handleUserProfileClick}>
            <ListItemText primary={userName} />
            <PersonIcon />
          </ListItemButton>
        )}

        <Divider sx={{ borderColor: "#ced4da" }} />

        <Collapse in={userProfileOpen} timeout="auto">
          <List component="div" disablePadding>
            <ListItemButton onClick={handleDrawerToggle} sx={{ pl: 4 }}>
              <Link
                href={`/users/view/${userId}`}
                style={{ textDecoration: "none", color: "#000", width: "100%" }}
              >
                <ListItemText primary="My Profile" />
              </Link>
            </ListItemButton>
            <Divider sx={{ borderColor: "#ced4da" }} />

            <ListItemButton onClick={handleDrawerToggle} sx={{ pl: 4 }}>
              <Link
                href="/auth/signin"
                style={{ textDecoration: "none", color: "#000", width: "100%" }}
              >
                <ListItemText primary="Log Out" />
              </Link>
            </ListItemButton>
            <Divider sx={{ borderColor: "#ced4da" }} />
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default DrawerComponent;
