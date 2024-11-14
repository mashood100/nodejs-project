import express from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

// Handle user registration
router.post('/register', register);
// Handle user login and token generation
router.post('/login', login);
// Protected route - requires valid JWT token
router.get('/profile', authMiddleware, getProfile);

export default router;