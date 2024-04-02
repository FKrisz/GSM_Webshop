import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import { ProductCard, ProductMedia, ProductDetails, ProductButton } from './styles';

const ProductDetailsScreen = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData?.token || '';
  const headers = {
    Authorization: `Bearer ${token}`
  };
  
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await axios.get(`/api/products/${id}/comments`, { headers });

        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    try {
        const payload = {
            text: commentText
        };

        const response = await axios.post(`/api/products/${id}/comments`, payload, { headers: headers });

        if (response.status === 201) {
          const newComment = {
            ...response.data,
            userId: {
              name: userData.name,
              prename: userData.prename
            }
          };
          setComments([...comments, newComment]);
          setCommentText('');
        } else if (response.status === 401) {
            alert('Vă rugăm să vă autentificați, pentru a lăsa un comentariu.');
        } else {
            alert('Vă rugăm încercați din nou.');
        }
    } catch (error) {
        alert('Vă rugăm să încercați mai târziu.');
    }
};


  if (!product) {
    return <Box>Loading...</Box>;
  }

  return (
    <div>
      <ProductCard>
        <ProductMedia
          image={product.image}
          alt={product.name}
        />
        <ProductDetails>
          <Typography variant="h5">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6">
            Preț: {product.price}
          </Typography>
          <ProductButton variant="contained" color="primary" onClick={() => onAddToCart(product._id, 1)} sx={{ backgroundColor: "#444444"}}>
            Adăugare în coș
          </ProductButton>
        </ProductDetails>
      </ProductCard>
      <Box style={{ marginTop: '40px' }}>
        <Typography
          variant="h6" 
          style={{ marginLeft: '16px', marginRight: '8px' }}
        >
          Spune-ne părerea ta!
        </Typography>
        {userData ? (
          <Box display="flex" alignItems="center" style={{ marginLeft: '16px', marginRight: '8px' }}>
            <TextField
              variant="outlined"
              value={commentText}
              fullWidth
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ width: '30%', marginRight: '8px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
              sx={{ backgroundColor: "#444444" }}
            >
              Trimite
            </Button>
          </Box>
        ) : (
          <Typography
            variant="body2"
            style={{ marginLeft: '16px', marginRight: '8px', marginTop: '8px' }}
          >
            Este nevoie să vă autentificați pentru a lăsa o recenzie.
          </Typography>
        )}

      </Box>
      <Box style={{ marginTop: '16px' }}>
        <Typography
          variant="h6"
          style={{ marginBottom: '16px', textAlign: 'center', fontWeight: 'bold' }}
        >
          Recenzii
        </Typography>
        <Paper elevation={10} style={{ padding: '16px' }}>
          {comments.map((comment, index) => (
            <Box key={comment._id} style={{ marginBottom: index < comments.length - 1 ? '16px' : '0' }}>
              <Typography variant="subtitle1 " style={{ fontWeight: 'bold' }}>
                {comment.userId?.name} {comment.userId?.prename}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
              {index < comments.length - 1 && <Divider style={{ margin: '8px 0' }} />}
            </Box>
          ))}
        </Paper>
      </Box>


    </div>
  );
};

export default ProductDetailsScreen;
