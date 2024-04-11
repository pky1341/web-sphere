import React from "react";
import { Button, Typography, Box } from "@mui/material";
import Image from "next/image";
import { StaticImageData } from "next/image";

interface ContentProps {
  title: string;
  desc: string;
  imageSrc: StaticImageData[];
  imgWidth: number;
  imgHeight: number;
}

const Content: React.FC<ContentProps> = ({ title, desc, imageSrc,imgWidth,imgHeight }) => {
    const contentImg=imageSrc[0];
  return (
    <>
      <Box className="bg-black text-white flex flex-col md:flex-row items-center justify-between p-8">
        <Box className="md:w-1/2 mb-8 md:mb-0">
          <Typography variant="h2" className="mb-4">
            {title}
          </Typography>
          <Typography variant="body1" className="mb-8">
            {desc}
          </Typography>
          <Box className="flex space-x-4">
            <Button variant="contained" color="primary">
              Free Courses
            </Button>
            <Button variant="outlined" color="inherit">
              Explore Blog
            </Button>
          </Box>
        </Box>
        <Box className="md:w-1/2">
          <Image src={contentImg} alt="Welcome Image" width={imgWidth} height={imgHeight} />
        </Box>
      </Box>
    </>
  );
};
export default Content;
