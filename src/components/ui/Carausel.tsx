"use client";
import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Image,{StaticImageData} from "next/image";
import { Box, Button, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

interface imgType {
  images: StaticImageData[];
}

const Carausel: React.FC<imgType> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const prevImg=()=>{
    setIndex((prevIndex)=>(prevIndex-1+images.length)%images.length);
  }
  const nextImg=()=>{
    setIndex((prevIndex)=>(prevIndex+1)%images.length);
  }

  return (
    <>
      <Container maxWidth="md">
        <Box className="flex justify-center items-center">
          <IconButton onClick={prevImg}>
            <NavigateBefore />
          </IconButton>
          <Image
            src={images[index]}
            alt="not found"
            width={300}
            height={300}
            className="w-full h-auto object-cover"
          />
          <IconButton onClick={nextImg}>
            <NavigateNext />
          </IconButton>
        </Box>
      </Container>
    </>
  );
};
export default Carausel;
