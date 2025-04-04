/**
 * Express Application Configuration
 * Sets up middleware and routes for the API server
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import Admin from './routes/admin';
import Users from './routes/users';
import Register from './routes/register';

dotenv.config();

const app = express();

// CORS configuration
const options = {
    origin: '*',  // Allow all origins - Configure appropriately for production
};

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(options));

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API',
        version: process.env.VERSION,
        domain: req.get('host'),
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/admin', Admin)     // Administrative endpoints
app.use('/api/users', Users)     // User management endpoints
app.use('/api/register', Register) // Registration endpoints

export default app;