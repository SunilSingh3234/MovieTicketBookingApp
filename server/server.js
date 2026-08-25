import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRouter from './routes/authRoute.js';
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
await connectDB()

connectDB();

// API Endpoints
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('API Working Successfully');
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});