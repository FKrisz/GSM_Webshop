import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import {db, connectToDb} from './db.js';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import Comment from './models/Comment.js';
import ShippingAddress from './models/ShippingAddressModel.js';
import { sendEmail } from '../utils/emailService.js';
import userRoutes from '../routes/userRoutes.js'; 
import { errorHandler, notFound } from '../mongo-db-data/middlewares/errorMiddleware.js';
import authMiddleware from '../mongo-db-data/middlewares/authMiddleware.js';
import authRoutes from '../routes/authRoutes.js'; 
import Stripe from 'stripe';

import { config } from 'dotenv';
config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// GET all the products from database
app.get('/api/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
      products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET individual product
app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// POST request to submit comments
app.post('/api/products/:id/comments', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const productId = req.params.id;
    const { text } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const comment = new Comment({
      productId,
      userId,
      text,
    });

      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET request to fetch the comments
app.get('/api/products/:id/comments', async (req, res) => {
  try {
    const productId = req.params.id;

    const comments = await Comment.find({ productId })
      .populate('userId', 'name prename')
      .exec();

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST request to create a new cart
app.post('/api/cart/create', async (req, res) => {
  try {
    const newCart = new Cart();
    await newCart.save();
    res.json(newCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST request to add a product to the cart
app.post('/api/cart/add', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const cartId = req.body.cart_id;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      // If the cart doesn't exist, create a new cart
      const newCart = new Cart();
      newCart.line_items.push({ product_id, quantity });
      await newCart.save();
      return res.json(newCart);
    }

    // Find the line item for the given product in the cart
    const lineItem = cart.line_items.find(item => item.product_id.toString() === product_id);

    if (lineItem) {
      // If the product is already in the cart, increment its quantity
      lineItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      cart.line_items.push({ product_id, quantity });
    }

    await cart.save();

    // Return a success message or the updated cart
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET request to get an existing cart
app.get('/api/cart/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId).populate('line_items.product_id');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT request to modify data of an item
app.put('/api/cart/update/:lineItemId', async (req, res) => {
  try {
    const { lineItemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      // If quantity is less than 1, remove the item from the cart
      const cart = await Cart.findOneAndUpdate(
        {},
        { $pull: { line_items: { _id: lineItemId } } },
        { new: true }
      );
      res.json(cart);
    } else {
      // Otherwise, update the quantity of the item
      const cart = await Cart.findOneAndUpdate(
        { 'line_items._id': lineItemId },
        { $set: { 'line_items.$.quantity': quantity } },
        { new: true }
      );

      res.json(cart);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE request to remove item from cart
app.delete('/api/cart/remove/:lineItemId', async (req, res) => {
  try {
    const { lineItemId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      {},
      { $pull: { line_items: { _id: lineItemId } } },
      { new: true }
    );

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE request to empty cart
app.delete('/api/cart/empty', async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate({}, { line_items: [] }, { new: true });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//-------------- Shipping Address-------------------------
// GET request to retrieve the shipping address for a user
app.get('/api/shipping-address/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const shippingAddress = await ShippingAddress.findOne({ user: userId });
    if (!shippingAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
    res.json(shippingAddress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST request to save or update shipping address
app.post('/api/shipping-address', async (req, res) => {
  try {
    const { userId, address, city, province, postalCode, country, phoneNumber } = req.body;

    // Find or create a shipping address
    const shippingAddress = await ShippingAddress.findOneAndUpdate(
      { user: userId }, // find a document with user id
      {
        user: userId,
        address,
        city,
        province,
        postalCode,
        country,
        phoneNumber
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Shipping address saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/send-email', async (req, res) => {
  try {
    // Extract the email, subject and message from the request body
    const { email, subject, message } = req.body;

    // Send the email using the emailService
    const info = await sendEmail(email, subject, message);

    console.log('Message sent: %s', info.messageId);

    res.json({
      success: true,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Could not send email.',
    });
  }
});

//-------------- Stripe-----------
// POST request to create a charge
app.post('/api/charge', async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount,
      currency: 'ron',
      confirmation_method: 'manual',
      confirm: true,
    });


    if (paymentIntent.status === 'succeeded') {
      res.json({ success: true });
    } else {

      res.json({ success: false, message: 'Payment failed.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.', error: err.message });
  }
});

app.use("/api/users", userRoutes)
app.use('/auth', authRoutes);

// ------------deployment----
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

//----------------MongoDB--------------------------------
mongoose.connect('mongodb://127.0.0.1:27017/pulsit-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

connectToDb(() => {
    console.log('Successfully connected to database!');
app.listen(8000, () => {
	console.log('Server is listening on port 8000');
}); 
})