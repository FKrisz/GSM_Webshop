import React, { useEffect, useState } from 'react';
import { Grid, Box, Pagination } from '@mui/material';
import Product from './Product/Product';
import axios from 'axios';

const Products = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          params: {
            page: page,
            limit: productsPerPage,
          },
        });
        // Access the products array from the response data
        setProducts(response.data.products);
        // Calculate total pages
        setTotalPages(Math.ceil(response.data.total / productsPerPage));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 3,
        }}
      >
        <Pagination count={totalPages} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};

export default Products;