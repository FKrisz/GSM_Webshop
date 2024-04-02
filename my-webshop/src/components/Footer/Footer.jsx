import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ 
        width: '100%',
        position: 'relative',
        bottom: 0,
        backgroundColor: '#f5f5f5',
        padding: '1rem 0',
        textAlign: 'center',
        height: '50px',
    }}>

      <Box>
        <IconButton component="a" href="https://www.facebook.com/pulsitmobile" target="_blank" rel="noreferrer"
          sx={{
            color: "#333333",
        }}>
          <Facebook />
        </IconButton>
        <IconButton color="primary" component="a" href="https://www.instagram.com/pulsitmobile/" target="_blank" rel="noreferrer"
          sx={{
            color: "#333333",
            }}>
          <Instagram />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} pulsit - Shop & Service
      </Typography>
    </Box>
  );
};

export default Footer;
