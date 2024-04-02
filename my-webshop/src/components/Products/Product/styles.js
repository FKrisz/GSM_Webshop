import { styled } from '@mui/system';
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

export const ProductCard = styled(Card)({
  maxWidth: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

export const ProductMedia = styled(CardMedia)({
  paddingTop: '100%',
});

export const ProductActions = styled(CardActions)({
  justifyContent: 'space-between',
});

export const ProductContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const ProductLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit'
});
