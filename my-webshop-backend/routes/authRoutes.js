import express from 'express';
import authMiddleware from '../mongo-db-data/middlewares/authMiddleware.js';

const router = express.Router();

// Include the middleware in the routes that require authentication
router.get('/protected', authMiddleware, (req, res) => {
  // You can now access req.userId here
  res.json({ message: 'This is a protected route', userId: req.userId });
});

export default router;