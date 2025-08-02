import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';

import { connectDB } from './lib/db.js'; 

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/user', chatRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});