import {loginUser,OtpUser} from '../services/authService.js';

export const userLogin=async(req,res)=>{
    try {
        const loginResponse=await loginUser(req.body);
        return res.status(200).json(loginResponse);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

export const userOTP=async(req,res)=>{
    try {
        const otpResponse=await OtpUser(req.body);
        return res.status(200).json(otpResponse);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}