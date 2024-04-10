"use client";
import Container from '@mui/material/Container';
import { Box } from '@mui/material';


const Carausel=()=>{
   return (
    <>
    <Container maxWidth="md">
      <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        transition: 'transform 0.5s ease',
        transform: `translateX(-${currentIndex * 100}%)`,
      }}
      >
         
      </Box>
    </Container>
    </>
   );
}
export default Carausel;