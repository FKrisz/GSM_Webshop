import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import NavBar from './components/Navbar/NavBar';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import AboutScreen from './pages/AboutScreen';
import ServiceScreen from './pages/ServiceScreen';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailsPage from './pages/ProductDetailScreen/ProductDetailsScreen';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import OrderConfirmation from './components/Checkout/OrderConfirmation';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SingIn/SignIn';
import Profile from './components/Profile';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NFyigKQLKIz5c8V7L44SIaMfL0MyNPEvXS7UUfiTdeKB6KolTfY5PLalUHRrrM1L4cOyjBTXQ4wady3LCPniE5500mBHGJQIJ');

function App() {
  const [cart, setCart] = useState({ line_items: [] });

  //-------------------Cart operations-----------------------------
  const fetchCart = async () => {
    try {
      const cartId = localStorage.getItem('cartId');
      if (!cartId) {
        return;
      }

      const response = await axios.get(`/api/cart/${cartId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cart]);

    const createCart = async () => {
      try {
        const response = await axios.post('/api/cart/create');
        localStorage.setItem('cartId', response.data._id);
        setCart(response.data);
      } catch (error) {
        console.error('Error creating cart:', error);
      }
    };

    useEffect(() => {
      const cartId = localStorage.getItem('cartId');
      if (!cartId) {
        createCart();
      }
    }, []);

  const onUpdateCartQty = async (lineItemId, newQuantity) => {
    try {
      const response = await axios.put(`/api/cart/update/${lineItemId}`, { quantity: newQuantity });
      setCart(response.data);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const onRemoveFromCart = async (lineItemId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${lineItemId}`);
      setCart(response.data);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const onEmptyCart = async () => {
    try {
      const response = await axios.delete('/api/cart/empty');
      setCart(response.data);
    } catch (error) {
      console.error('Error emptying cart:', error);
    }
  };

    // State for Snackbar
    const [open, setOpen] = useState(false);
    // Function to handle Snackbar opening
    const handleOpenSnackbar = () => {
      setOpen(true);
    };
    // Function to handle Snackbar closing
    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  //Function to handle add to cart operation
  const onAddToCart = async (productId, quantity) => {
    try {
      const cartId = localStorage.getItem('cartId');
      const response = await axios.post(`/api/cart/add/`, { product_id: productId, quantity, cart_id: cartId });
      if (response.data) {
        setCart(response.data);
        handleOpenSnackbar();
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  return (
    <Elements stripe={stripePromise}>
      <BrowserRouter>
        <Layout>
          <NavBar />
          <div id="page-body">
            <Routes>
              <Route path="/" element={<HomePage onAddToCart={onAddToCart} />} />
              <Route path="/service" element={<ServiceScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/products/:id" element={<ProductDetailsPage onAddToCart={onAddToCart} />} />
              <Route path="/checkout" element={<Checkout cart={cart} />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                  path="/cart"
                  element={
                    <Cart
                      cart={cart}
                      handleUpdateCartQty={onUpdateCartQty}
                      handleRemoveFromCart={onRemoveFromCart}
                      handleEmptyCart={onEmptyCart}
                    />
                  }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Layout>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            Product successfully added to cart!
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </Elements>
  );
}

export default App;
