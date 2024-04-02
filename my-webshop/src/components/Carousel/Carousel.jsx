import React, { useState } from 'react';
import { Box, Paper, ButtonGroup, Button } from '@mui/material';

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          height: 400,
          backgroundImage: `url(${images[activeIndex].img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <ButtonGroup variant="contained" aria-label="carousel-controls" sx={{ marginTop: 1 }}>
        {images.map((image, index) => (
          <Button
            key={index}
            onClick={() => handleImageChange(index)}
            style={{
              color: '#ffffff',
              backgroundColor: activeIndex === index ? '#333333' : '#666666',
              minWidth: '100px',
            }}
          >
            {index + 1}
          </Button>
        ))}
      </ButtonGroup>

    </Box>
  );
};

export default Carousel;
