import React from 'react';
import { Box } from '@mui/material';
import Footer from './components/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',  // 100% of the viewport height
    }}>
      <Box sx={{ 
          flex: '1',
      }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
