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
import logo from "@/images/logo/3d.png";
import SignUp from "@/components/forms/SignUp";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Logout, Settings } from "@mui/icons-material";
import {withSession} from '@/utils/withSession';
export const getServerSideProps = withSession;

interface HeaderProps{
  session:any
}
const Header:React.FC<HeaderProps>  = ({session }) => {
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const openForm = () => {
    setOpenSignUpModal(true);
  };
  const closeForm = () => {
    setOpenSignUpModal(false);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  // const {props:session}=withSession();
  // const { sessi } = props;
  return (
    <nav className="bg-[#3B3B3B] p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a className="text-white hover:text-gray-300" href="#">
          Home
        </a>
        <div className="group inline-block relative">
          <a
            className="text-white hover:text-gray-300 inline-flex items-center"
            href="#"
          >
            Courses
            <IconButton
              name="keyboard_arrow_down"
              size="small"
              className="ml-1"
              disableRipple
            >
              <i className="fas fa-heart" />
            </IconButton>
          </a>
          <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
            <li>
              <a
                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >
                Submenu 1
              </a>
            </li>
            <li>
              <a
                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                href="#"
              >
                Submenu 2
              </a>
            </li>
          </ul>
        </div>
        <a className="text-white hover:text-gray-300" href="#">
          About
        </a>
        <a className="text-white hover:text-gray-300" href="#">
          Contact Us
        </a>
      </div>
      <div className="flex items-center">
        <Image src={logo} alt="Company Logo" width={40} height={50} />
      </div>
      <div className="flex items-center space-x-4">
        <div className="group inline-block relative text-white">
          <IconButton
            name="search"
            size="small"
            className="text-white"
            disableRipple
          >
            <i className="fas fa-heart" />
          </IconButton>
          <TextField
            className="absolute hidden bg-white text-black rounded p-1 group-hover:block"
            placeholder="Search..."
            type="text"
          />
        </div>
        <IconButton
          name="wb_sunny"
          size="small"
          className="text-white"
          disableRipple
        >
          <i className="fas fa-heart" />
        </IconButton>
        <IconButton name="person" size="small" className="text-white">
          <i className="fas fa-heart" />
        </IconButton>
        {session ? (
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
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
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Button color="primary" variant="outlined" disableRipple>
              Login
            </Button>
            <Button color="primary" variant="contained" onClick={openForm}>
              Sign Up
            </Button>
            <SignUp isOpen={openSignUpModal} onClose={closeForm} />
          </>
        )}
      </div>
    </nav>
  );
};

export { Header };
