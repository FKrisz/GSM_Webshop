import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function AddressForm({ userData, values, handleChange, errors }) {

  const initialValues = {
    lastName: userData.name || '',
    firstName: userData.prename || '',
    address: userData.address || '',
    city: userData.city || '',
    province: userData.province || '',
    postalCode: userData.postalCode || '',
    country: userData.country || '',
    phoneNumber: userData.phoneNumber || '',
  };

  return (
    <form>
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Adresă de livrare
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Nume"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={values.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Prenume"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={values.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Adresa de email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Număr de telefon"
            fullWidth
            autoComplete="phoneNumber"
            variant="standard"
            value={values.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="address"
              name="address"
              label="Adresă"
              fullWidth
              variant="standard"
              value={values.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="Oraș"
              fullWidth
              variant="standard"
              value={values.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="Județ"
            fullWidth
            variant="standard"
            value={values.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Cod poștal"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={values.zip}
            onChange={handleChange}
            error={!!errors.zip}
            helperText={errors.zip}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Țară"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={values.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          />
          </Grid>
        </Grid>
      </React.Fragment>
    </form>
  );
}
