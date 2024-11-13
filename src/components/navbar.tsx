import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Collapse,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userProfileOpen, setOpen] = useState(false);

  const handleUserProfileClick = () => {
    setOpen(!userProfileOpen);
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const pages = [
    { name: "Home", path: "/", id: 1 },
    { name: "Contacts", path: "/contacts", id: 2 },
    { name: "Company Profile", path: "/", id: 3 },
    { name: "Users", path: "/", id: 4 },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
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
              ></Image>
            </Link>
          </Box>
          <Box>
            <Button size="small" onClick={handleDrawerToggle}>
              <CloseIcon sx={{ color: "#fff", fontSize: "28px" }}></CloseIcon>
            </Button>
          </Box>
        </Toolbar>
      </Box>
      <List>
        {pages.map((item) => (
          <>
            <ListItem onClick={handleDrawerToggle} key={item.id} disablePadding>
              <ListItemButton sx={{ textAlign: "left" }}>
                <Link
                  href={item.path}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <ListItemText primary={item.name} />
                </Link>
              </ListItemButton>
            </ListItem>
            <Divider sx={{ borderColor: "#ced4da" }} />
          </>
        ))}

        <ListItemButton onClick={handleUserProfileClick}>
          <ListItemText primary="Amir" />
          <PersonIcon></PersonIcon>
        </ListItemButton>

        <Divider sx={{ borderColor: "#ced4da" }} />

        <Collapse in={userProfileOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <Link href="/" style={{ textDecoration: "none", color: "#000" }}>
                <ListItemText primary="My Profile" />
              </Link>
            </ListItemButton>
            <Divider sx={{ borderColor: "#ced4da" }} />

            <ListItemButton sx={{ pl: 4 }}>
              <Link
                href="/auth/signin"
                style={{ textDecoration: "none", color: "#000" }}
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

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          backgroundColor: "#4E73DF",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: "82px" }}>
            <Button
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "flex", md: "none" },
              }}
            >
              <MenuIcon fontSize="large" />
            </Button>
            <Box
              sx={{
                mr: "70px",
                flexGrow: { xs: 1, md: 0 },
                display: { xs: "flex" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link href="/">
                <Image
                  src="/images/Logo_White.svg"
                  width="170"
                  height="40"
                  alt=""
                ></Image>
              </Link>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page.id}
                  style={{
                    fontWeight: "300",
                    textDecoration: "none",
                    color: "#fff",
                    margin: "0 25px",
                  }}
                  href={page.path}
                >
                  {page.name}
                </Link>
              ))}
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ color: "#fff", textTransform: "capitalize" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon sx={{ fontSize: "26px", mr: 1 }} />
                  <Typography>Amir</Typography>
                </Box>
              </Button>
              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={0}
                sx={{
                  marginTop: "22px",
                  boxShadow: "none",
                  "& .MuiPaper-root": {
                    width: "200px",
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
                <MenuItem onClick={handleClose}>
                  <Link
                    href="/"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    href="/auth/signin"
                    style={{ textDecoration: "none", color: "#212529" }}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="persistent"
        sx={{
          width: "240",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "90%",
            boxSizing: "border-box",
            borderRight: 0,
            boxShadow: "0px 0px 12px #00000026",
          },
        }}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
