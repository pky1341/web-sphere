"use client";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import Image from "next/image";
import logo from "@/images/logo/webLogo.png";
import SignUp from "@/components/forms/SignUp";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Logout, Settings } from "@mui/icons-material";
import { useSession, signOut } from "next-auth/react";
import Login from "@/components/forms/Login";
import Search from "@/components/ui/Search";

const Header: React.FC = () => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const { data: session } = useSession();
  const openForm = () => {
    setOpenSignUpModal(true);
  };
  const closeForm = () => {
    setOpenSignUpModal(false);
  };
  const openLoginForm = () => {
    setOpenLogin(true);
  };
  const closeLogin = () => {
    setOpenLogin(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <nav className="bg-[#3B3B3B] p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Image src={logo} alt="Company Logo" width={60} height={80} />
        </div>
        <a className="text-white hover:text-gray-300" href="#">
          Home
        </a>
        <div className="group inline-block relative">
          <a
            className="text-white hover:text-gray-300 inline-flex items-center"
            href="#"
          >
            Library
          </a>
        </div>
        <a className="text-white hover:text-gray-300" href="#">
          About
        </a>
        <a className="text-white hover:text-gray-300" href="#">
          Contact Us
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <Search/>
        {session ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <AccountCircle fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button
              color="primary"
              variant="outlined"
              onClick={openLoginForm}
              disableRipple
            >
              Login
            </Button>
            <Login isOpen={openLogin} onClose={closeLogin} />
            <Button color="primary" variant="contained" onClick={openForm}>
              Sign Up
            </Button>
            <SignUp
              isOpen={openSignUpModal}
              onClose={closeForm}
              session={session}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export { Header };
