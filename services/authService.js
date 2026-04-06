import employeeModel from '../models/employee.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendOTP from '../config/otp.js';
dotenv.config();

let emailOTP=new Map();

const validEmail=(email)=>{
    const domain=email.split('@')[1];
    console.log("domain",domain)
    if(domain!=="sharklasers.com" ){
        return false;
    }
    return true;
}

export const loginUser=async({email})=>{
    try {
        if(validEmail(email)){
            console.log("valid email")
            const OTP=await sendOTP(email);
            emailOTP.set(email,OTP);
            console.log(emailOTP)
            return {message:`OTP ${OTP} sent successfully to mail ${email}`};
        }
        else {
            throw new Error('Invalid Email');
        }
    } catch (error) {
        throw new Error(`Failed to send OTP to ${email} ${error.message}`);
    }
}

export const OtpUser=async({email,userOtp})=>{
    try {
        if(userOtp === emailOTP.get(email)){
            console.log("route",emailOTP.get(email));
            const name=email.split('_')[0];
            const role=email.split('_')[1].split('@')[0];
            const newEmployee=new employeeModel({name,email,role});
            await newEmployee.save();

            const token=jwt.sign({
                userName:newEmployee.name,
                userEmail:newEmployee.email,
                userRole:newEmployee.role,
                userStatus:newEmployee.status
            },process.env.secretKey);
            
            return {message:'User authenticated successfully',token:token};
        }
        else{
            throw new Error('OTP not valid') ;
        } 
    }
    catch (error) {
        throw new Error('Error in authenticating User from OTP ');
    }
}