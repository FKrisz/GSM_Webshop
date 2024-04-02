import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// Initialize an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Call this function to set the token
function setAuthToken(token) {
  if (token) {
    // Apply the token to every request if logged in
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete apiClient.defaults.headers.common['Authorization'];
  }
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  
  // Initialize state for error and snackbar open status
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset error and close snackbar
    setError(null);
    setOpen(false);

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email,
        password,
      });
      
      localStorage.setItem('user', JSON.stringify(response.data));
    
      // Set the auth token for future API calls
      setAuthToken(response.data.token);
      navigate('/profile');

    } catch (error) {
      if (error.response) {

        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
  
        if (error.response.status === 401) {
          setError("Adresa email sau parolă incorectă. Încearcă din nou!");
        } else if (error.response.status >= 500) {
          setError("A apărut o problemă cu server-ul. Încearcă din nou!");
        }
      } else if (error.request) {
        setError("Se pare că este o problemă cu conexiunea de internet. Încearcă din nou!");
        console.log(error.request);
      } else {
        setError("A apărut o eroare. Încearcă din nou!");
        console.log('Error', error.message);
      }
      // Open the snackbar when an error occurs
      setOpen(true);
      console.log(error.config);
    }
  };
  
  // Handler to close the snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
           sx={{
             m: 1,
             color: "#ffffff",
             backgroundColor: "#666666" } }>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Intră în cont
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresă email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parolă"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                 mt: 3,
                 mb: 2,
                 background: "#444444"
                 }}
            >
              Autentificare
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Nu ai cont? Click aici"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}