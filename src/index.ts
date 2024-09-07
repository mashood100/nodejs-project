import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);
mongoose.connect("mongodb+srv://mashooduser1:mashooduser1@cluster0.uemlqdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
