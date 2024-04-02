import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCart() {
  const [cart, setCart] = useState({ line_items: [] });

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
  }, []);

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

  const onAddToCart = async (productId, quantity) => {
    try {
      const cartId = localStorage.getItem('cartId');
      const existingCartItemIndex = cart.line_items.findIndex(item => item.product_id._id === productId);
  
      if (existingCartItemIndex !== -1) {
        const existingCartItem = cart.line_items[existingCartItemIndex];
        const newQuantity = existingCartItem.quantity + quantity;
        await onUpdateCartQty(existingCartItem.id, newQuantity);
      } else {
        const response = await axios.post(`/api/cart/add/`, { product_id: productId, quantity, cart_id: cartId });
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };  

  return {
    cart,
    fetchCart,
    createCart,
    onUpdateCartQty,
    onRemoveFromCart,
    onEmptyCart,
    onAddToCart,
  };
}
