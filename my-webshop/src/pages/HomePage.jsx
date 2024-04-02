import React from 'react';
import Products from "../components/Products/Products";
import { Container, Paper, Typography } from '@mui/material';
import Carousel from '../components/Carousel/Carousel';
import pic1_carousel from '../assets/pic1_carousel.jpg';
import pic2_carousel from '../assets/pic2_carousel.jpg';
import pic3_carousel from '../assets/pic3_carousel.jpg';

const HomePage = ({ onAddToCart }) => {

  const carouselImages = [
    {
        img: pic2_carousel,
        title: 'pic2_carousel',
      },
    {
      img: pic3_carousel,
      title: 'pic3_carousel',
    },
    {
        img: pic1_carousel,
        title: 'pic1_carousel',
      },

  ];

  return (
    <Container maxWidth={false} disableGutters>
      <Carousel images={carouselImages} />
      <Paper elevation={5} sx={{ mt: 4, p: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          Cele mai noi produse
        </Typography>
        <Typography variant="body1" align="center">
        Descoperă cele mai noi produse adăugate pe site
        </Typography>
      
      <Products onAddToCart={onAddToCart} /></Paper>
    </Container>
  );
};

export default HomePage;