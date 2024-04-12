import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";

interface CardData {
  title: string;
  description: string;
}

const cardData: CardData[] = [
  {
    title: "Read",
    description: "AWS Lambda Functions Wit...",
  },
  {
    title: "Practice",
    description: "Explore Practice Problems",
  },
  {
    title: "Learn",
    description: "Interview Preparation",
  },
  // Add more card data here...
];

const Cards: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={4}
          className="flex justify-center"
        >
          <Card className="max-w-sm">
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary">
                  Buy
                </Button>
                <Button variant="outlined" color="primary">
                  Read
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
