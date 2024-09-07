import express from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Only protect the profile route
router.get('/profile', authMiddleware, getProfile);

export default router;