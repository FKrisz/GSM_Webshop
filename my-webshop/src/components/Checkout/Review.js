import * as React from 'react';
import { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review({ cart, addressValues, setPaymentValues  }) {

  const address = [
    addressValues.address,
    addressValues.city,
    addressValues.state,
    addressValues.zip,
    addressValues.country
  ];

  const products = cart.line_items;

  const totalPrice = products.reduce((total, product) => {
    const price = product.product_id.price ? parseFloat(product.product_id.price.replace(' Lei', '')) : 0;
    const lineTotal = price * product.quantity;
    return total + lineTotal;
  }, 0).toFixed(2);

  useEffect(() => {
    setPaymentValues(prevValues => ({ ...prevValues, totalPrice }));
}, [setPaymentValues, totalPrice]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Revizuire comandă
      </Typography>
      <List disablePadding>
      {products.map((product) => (
      <ListItem key={product.product_id._id} sx={{ py: 1, px: 0 }}>
        <ListItemText primary={product.product_id.name} secondary={product.product_id.description} />
        <Typography variant="body2">{product.product_id.price}</Typography>
      </ListItem>
))}

      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {totalPrice} Lei
        </Typography>
      </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Adresa de livrare 
          </Typography>
          <Typography gutterBottom>{addressValues.firstName} {addressValues.lastName}</Typography>
          <Typography gutterBottom>{addressValues.email}</Typography>
          <Typography gutterBottom>{addressValues.phoneNumber}</Typography>
          <Typography gutterBottom>{address.join(', ')}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
