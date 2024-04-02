import { styled } from '@mui/system';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const CartLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
});

export const CartListItem = styled('li')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  padding: '1rem',
  listStyle: 'none',
});

export const CartImage = styled('img')({
  width: '80px',
  marginRight: '1rem',
});

export const CartItemInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 0%',
});

export const CartItemActions = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const CartButton = styled(Button)({
  margin: '0 0.5rem',
});

export const CartItemQuantity = styled(Typography)({
  margin: '0 1rem',
});

export const CartItemTitle = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.2rem',
});

export const CartItemPrice = styled(Typography)({
  color: 'rgba(0, 0, 0, 0.54)',
});
