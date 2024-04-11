"use client";
import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, styled } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Image, { StaticImageData } from "next/image";
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "3rem",
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.main,
  },
  "&:focus": {
    outline: "none",
  },
  "& .MuiTouchRipple-root": {
    display: "none",
  },
}));
interface imgType {
  images: StaticImageData[];
}

const Carousel: React.FC<imgType> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const prevImg = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const nextImg = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  useEffect(() => {
    const handleResize = () => {
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box className="w-full h-screen relative">
      <StyledIconButton onClick={prevImg} className="left-0 z-10">
        <ArrowBackIosNew style={{ fontSize: "40px" }} />
      </StyledIconButton>
      <Image
        src={images[index]}
        alt="not found"
        layout="fill"
        objectFit="cover"
        priority={false}
      />
      <StyledIconButton onClick={nextImg} className="right-0 z-10">
        <ArrowForwardIos style={{ fontSize: "40px" }} />
      </StyledIconButton>
    </Box>
  );
};
export default Carousel;