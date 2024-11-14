import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const TOKEN_EXPIRATION = '4d';


export const register = async (req: Request, res: Response) => {
  try {
    // Extract user data from request body
    const { username, email, password } = req.body;
    // Create new user instance (password will be hashed via middleware)
    const user = new User({ username, email, password });
    // Save user to database
    await user.save();
    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password match
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token with 4-day expiration
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in', error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Find user by ID (from auth middleware) and exclude password
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return user data
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching profile', error });
  }
};