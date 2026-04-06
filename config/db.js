import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.mongoDB_URL)
        console.log('Database connected with Backend server');
    } catch (error) {
        console.log("Error in connecting DB with backend server",error);
    }
}


export default connectDB;