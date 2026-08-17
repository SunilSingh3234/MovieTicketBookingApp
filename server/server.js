import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRouter from './routes/authRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Database Connection Error:', error.message);
        process.exit(1);
    }
};

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