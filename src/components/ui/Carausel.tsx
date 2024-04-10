"use client";
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

interface ImageCarouselProps {
  images: string[];
  autoScroll?: boolean;
  scrollDuration?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoScroll = true,
  scrollDuration = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScroll) {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, scrollDuration);

    return () => clearInterval(interval);
  }, [autoScroll, images.length, scrollDuration]);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const scrollDirection = e.deltaY > 0 ? 1 : -1;
    setCurrentIndex((prevIndex) =>
      prevIndex + scrollDirection >= 0 &&
      prevIndex + scrollDirection < images.length
        ? prevIndex + scrollDirection
        : prevIndex
    );
  };

  return (
    <Box
      className="w-full h-screen overflow-hidden relative"
      onWheel={handleScroll}
    >
      <div
        className="w-full h-full flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            className="w-full h-full flex justify-center items-center"
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="max-h-full max-w-full"
            />
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default ImageCarousel;