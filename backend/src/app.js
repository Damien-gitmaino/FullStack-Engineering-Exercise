import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import Admin from './routes/admin';
import Users from './routes/users';
import Register from './routes/register';

dotenv.config();

const app = express();

const options = {
    origin: '*',
};

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

app.use('/api/admin', Admin)
app.use('/api/users', Users)
app.use('/api/register', Register)

export default app;