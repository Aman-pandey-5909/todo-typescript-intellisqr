import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './utils/connectDB';
import authRoutes from './routes/auth.route'
import { notFound } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

const app = express();
const PORT = process.env.PORT;
 
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use(notFound);
app.use(errorHandler); 

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});