import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableRow, TextField  } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

    // Add state for handling the Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Add state for the address fields
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [postalCode, setPostalCode] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate("/signIn");
  };

  const handleSaveShippingAddress = async () => {
    try {
      await fetch('/api/shipping-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          address,
          city,
          province,
          postalCode,
          country,
          phoneNumber,
        }),
      });
  
      // Open the Snackbar with a success message
      setSnackbarMessage('Adresa de livrare a fost salvată cu succes!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error saving shipping address:', error);
  
      // Open the Snackbar with an error message
      setSnackbarMessage('A apărut o eroare. Vă rugăm încercați din nou!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpenSnackbar(false);
  };
  
  const [loading, setLoading] = useState(true);

// Fetch shipping address when the component is mounted
useEffect(() => {
  const fetchShippingAddress = async () => {
    try {
      const response = await fetch(`/api/shipping-address/${user._id}`);
      const data = await response.json();
      if (data) {
        setAddress(data.address || '');
        setCity(data.city || '');
        setProvince(data.province || '');
        setPostalCode(data.postalCode || '');
        setCountry(data.country || '');
        setPhoneNumber(data.phoneNumber || '');
      }
    } catch (error) {
      console.error('Error fetching shipping address:', error);
    } finally {
      // Set loading to false after fetching data
      setLoading(false);
    }
  };

  if (user) {
    fetchShippingAddress();
  }
}, []); // Empty dependency array to ensure this runs only once when the component mounts

  if (!user) {
    return <Typography variant="h5">Te rugăm să te autentifici.</Typography>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Typography component="h1" variant="h5">
          Contul meu
        </Typography>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">Nume</TableCell>
              <TableCell align="right">{user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Prenume</TableCell>
              <TableCell align="right">{user.prename}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Adresă email</TableCell>
              <TableCell align="right">{user.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="contained" color="primary" onClick={handleSignOut}
         sx={{ mt: 3, mb: 2, background: "#444444" }}>
          Deconectare
        </Button>
      </Box>
      {!loading && (
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant="h6">Adresa de livrare</Typography>
          <TextField label="Adresă" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
          <TextField label="Oraș" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
          <TextField label="Județ" fullWidth value={province} onChange={(e) => setProvince(e.target.value)} />
          <TextField label="Cod poștal" fullWidth value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          <TextField label="Țară" fullWidth value={country} onChange={(e) => setCountry(e.target.value)} />
          <TextField label="Număr de telefon" fullWidth value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleSaveShippingAddress} sx={{ mt: 3, mb: 2, background: "#444444" }}>
            Salvare
          </Button>
        </Box>
      )}
        <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </Container>
    
  );
}

export default Profile;
