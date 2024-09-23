import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://user-management-app-frontend.onrender.com',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await sequelize.sync();
        console.log('Database connected');
        
        app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log('Error: ' + err);
    }
};

startServer();