import React from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderNumber } = location.state || {};

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
    >
      <Paper elevation={3} style={{ padding: '30px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Vă mulțumim pentru comandă!
        </Typography>
        <Typography variant="subtitle1">
            {orderNumber ? `Numărul comenzii este: #${orderNumber}.` : ''} <br />
          Confirmarea comenzii s-a trimis pe adresa dumneavoastră de email, vă vom ține la curent cu statusul comenzii.
        </Typography>
      </Paper>
    </Box>
  );
};

export default OrderConfirmation;
