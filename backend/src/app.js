import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Task Manager Backend is running!');
});

export default app;