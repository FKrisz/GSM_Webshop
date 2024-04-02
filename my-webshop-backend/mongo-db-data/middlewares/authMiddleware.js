import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  // get the token from the Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Check if the Authorization header is in the format: Bearer [TOKEN]
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token error' });
  }
  
  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatted' });
  }

  // Verify token
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Token is not valid' });
    } else {
      // Set user id for future requests
      req.userId = decodedToken.id;
      next();
    }
  });
}

export default authMiddleware;
