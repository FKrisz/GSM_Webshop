import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import { ProductCard, ProductMedia, ProductContent, ProductActions, ProductLink } from './styles';

const Product = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product._id, 1);
  };

  return (
    <ProductCard>
      <ProductLink to={`/products/${product._id}`}>
        <ProductMedia image={product.image} title={product.name} />
      </ProductLink>
      <ProductContent>
        <div>
          <Typography variant="h5" gutterBottom>
            <ProductLink to={`/products/${product._id}`}>
              {product.name}
            </ProductLink>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </div>

      </ProductContent>
      <ProductActions disableSpacing>
        <div>
          <Typography variant="h5">{product.price}</Typography>
        </div>
        <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
          <AddShoppingCart />
        </IconButton>
      </ProductActions>
    </ProductCard>
  );
};

export default Product;
