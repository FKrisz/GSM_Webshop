import { styled } from '@mui/system';
import { Container, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { darken } from '@mui/system';

export const CartContainer = styled(Container)(({ theme }) => ({
  marginTop: '5%',
}));

export const CartButton = styled(Button)(({ theme }) => ({
  minWidth: '150px',
  width: '100%',
  [theme.breakpoints.down('xs')]: {
    marginBottom: '5px',
  },
  [theme.breakpoints.up('xs')]: {
    marginRight: '20px',
  },
  '&:first-of-type': {
    marginRight: '10px',
    marginBottom: '5px',
  },
}));

export const CheckoutButton = styled(CartButton)({
  backgroundColor: '#444444',
  width: '100%',
  '&:hover': {
    backgroundColor: darken('#444444', 0.1),
  },
});


export const CartLink = styled(RouterLink)({
  textDecoration: 'none',
});

export const CartDetails = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
});

export const CartList = styled('ul')({
  flex: '2 1 600px',
  padding: '0',
  margin: '0 1rem 0 0',
  listStyle: 'none',
});

export const CartSection = styled('section')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
});

export const CartActions = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem',
});

export const SummaryContainer = styled('div')({
  position: 'sticky',
  top: '1rem',
  padding: '1rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '4px',
  marginLeft: '1rem',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  '& h4': {
    borderBottom: '1px solid #000',
    paddingBottom: '1rem',  // Add padding below the Typography
    marginBottom: '1rem',   // Add margin below the Typography
},
});

export const ItemsContainer = styled('div')({});
