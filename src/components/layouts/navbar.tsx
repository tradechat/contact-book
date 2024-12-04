import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next/client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apiService";
import { User } from "@/models/user";
import DrawerComponent from "./drawer";
import { useUser } from "@/userContext";
import { UserType } from "@/models/userType";

const Navbar = () => {
  const { setUserType } = useUser();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userProfileOpen, setOpen] = useState(false);
  const router = useRouter();
  const handleUserProfileClick = () => {
    setOpen(!userProfileOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const pages = [
    { name: "Home", path: "/", id: 1 },
    { name: "Contacts", path: "/contacts", id: 2 },
    { name: "Company Profile", path: "/company", id: 3 },
    { name: "Users", path: "/users", id: 4 },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    deleteCookie("token");
    router.push("/auth/signin");
    setAnchorEl(null);
  };

  const { isLoading, data: user } = useQuery<User>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return;
  }

  if (user) {
    if (user.role) {
      setUserType(user.role as UserType);
    }
  }

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
                    fontWeight: "400",
                    textDecoration: "none",
                    color: "#fff",
                    opacity: page.path === router.pathname ? "1" : ".7",
                    margin: "0 25px",
                  }}
                  href={page.path}
                >
                  {page.name}
                </Link>
              ))}
            </Box>
            {user && (
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
                    <Typography>{user?.firstName}</Typography>
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
                      href={`/users/view/${user.id}`}
                      style={{ textDecoration: "none", color: "#212529" }}
                    >
                      My Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="persistent"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "95%",
            boxSizing: "border-box",
            borderRight: 0,
            boxShadow: "0px 0px 12px #00000026",
          },
        }}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <DrawerComponent
          pages={pages}
          userName={user?.firstName || "UserName"}
          userId={user?.id || ""}
          userProfileOpen={userProfileOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleUserProfileClick={handleUserProfileClick}
        />
      </Drawer>
    </>
  );
};

export default Navbar;
