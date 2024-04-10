"use client";
import React from 'react';
import { Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import Image from 'next/image';
import logo from '@/images/logo/3d.png';

const Header = () => {
  return (
    <nav className="bg-[#3B3B3B] p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a className="text-white hover:text-gray-300" href="#">
          Home
        </a>
        <div className="group inline-block relative">
          <a className="text-white hover:text-gray-300 inline-flex items-center" href="#">
            Courses
            <IconButton name="keyboard_arrow_down" size="small" className="ml-1">
              <i className="fas fa-heart" />
            </IconButton>
          </a>
          <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
            <li>
              <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">
                Submenu 1
              </a>
            </li>
            <li>
              <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">
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
          <IconButton name="search" size="small" className="text-white">
            <i className="fas fa-heart" />
          </IconButton>
          <TextField
            className="absolute hidden bg-white text-black rounded p-1 group-hover:block"
            placeholder="Search..."
            type="text"
          />
        </div>
        <IconButton name="wb_sunny" size="small" className="text-white">
          <i className="fas fa-heart" />
        </IconButton>
        <IconButton name="person" size="small" className="text-white">
          <i className="fas fa-heart" />
        </IconButton>
        <Button color="primary" variant="contained">
          Sign Up
        </Button>
      </div>
    </nav>
  );
};

export { Header };