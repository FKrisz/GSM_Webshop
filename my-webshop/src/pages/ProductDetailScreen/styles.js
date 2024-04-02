import { styled } from '@mui/system';
import { Card, CardContent, CardMedia, Button } from '@mui/material';

export const ProductCard = styled(Card)({
  display: 'flex',
  maxWidth: 800,
  margin: 'auto',
  padding: '2rem',
  marginTop: '1.5rem',
});

export const ProductMedia = styled(CardMedia)({
  width: 400,
  height: 400,
});

export const ProductDetails = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  padding: '5rem',
  '& .MuiTypography-root': {
    marginBottom: '1rem',
  },
});

export const ProductButton = styled(Button)({
  marginTop: '2rem',
});
