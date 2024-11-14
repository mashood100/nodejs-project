import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Middleware to verify JWT tokens and protect routes
// Key features:
// - Extracts token from Authorization header
// - Verifies token validity
// - Checks user existence
// - Validates token expiration (4 days)
// - Adds userId to request object for downstream use
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
    if (user.lastLogin < fourDaysAgo) {
      return res.status(401).json({ message: 'Token expired due to inactivity' });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};