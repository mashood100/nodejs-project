import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';
import authRoutes from './routes/authRoutes';
// import { connectShardedDB } from './config/dbConfig';
import { connectReplicaSet } from './config/replicationConfig';
import { cacheMiddleware } from './middleware/cache';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/todos', cacheMiddleware as unknown as express.RequestHandler, todoRoutes);
app.use('/api/auth', authRoutes);

// Initialize distributed components
(async () => {
  // await connectShardedDB();
  await connectReplicaSet();
  
  mongoose.connect("mongodb+srv://mashooduser1:mashooduser1@cluster0.uemlqdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
