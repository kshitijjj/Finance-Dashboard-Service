import express from 'express';
import connectDB from './config/db.js';
import userRoute from './routes/authRoute.js';
import financeRoute from './routes/financeRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app=express();
connectDB();

const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use('/user',userRoute);
app.use('/finance',financeRoute);

app.listen(PORT,()=>{
    console.log(`Backend Server running on port ${PORT}`);
})

