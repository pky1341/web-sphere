"use client";
import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import { Box, Button, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

interface imgType {
  images: string[];
}

const Carausel: React.FC<imgType> = ({ images }) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      <Container maxWidth="md">
        <Box className="flex justify-center items-center">
          <IconButton>
            <NavigateBefore />
          </IconButton>
          <Image
            src={images[index]}
            alt="not found"
            layout="responsive"
            width={300} 
            className="mx-auto"
          />
          <IconButton>
            <NavigateNext />
          </IconButton>
        </Box>
      </Container>
    </>
  );
};
export default Carausel;
