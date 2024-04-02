import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import MuiAlert from '@mui/material/Alert';

// Initialize an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
});


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

export default function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      name: data.get('firstName'),
      prename: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };
  
    try {
      // Register the user
      await apiClient.post('/users', userData);
  
      // Log in the user
      const loginResponse = await apiClient.post('/users/login', {
        email: userData.email,
        password: userData.password,
      });
      
      // Store the user data in local storage
      localStorage.setItem('user', JSON.stringify(loginResponse.data));
       // Set the auth token for future API calls
      setAuthToken(loginResponse.data.token);                          
      navigate('/profile');


    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
  
        if (error.response.status === 409) {
          setSeverity("error");
          setMessage("Utilizatorul există deja.");
          setOpen(true)
        } else if (error.response.status >= 500) {
          setSeverity("error");
          setMessage("Server error. Te rugăm să încerci din nou!");
          setOpen(true);
        }
      } else if (error.request) {
        setSeverity("error");
        setMessage("Network error. Te rugăm să verifici conexiunea la internet!");
        setOpen(true);
        console.log(error.request);
      } else {
        setSeverity("error");
        setMessage("A apărut o eroare. Te rugăm să încerci din nou!");
        setOpen(true);
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
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
              backgroundColor: "#fa0512"
               }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Înregistrare client
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nume"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Prenume"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresă email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Parolă"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Ai deja un cont? Click aici
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <MuiAlert onClose={handleClose} severity={severity} elevation={6} variant="filled">
            {message}
          </MuiAlert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
