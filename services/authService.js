import employeeModel from '../models/employee.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendOTP from '../config/otp.js';
dotenv.config();
import bcrypt from 'bcrypt';

let emailOTP=new Map();

const validEmail=(email)=>{
    const domain=email.split('@')[1];
    console.log("domain",domain)
    if(domain!==process.env.companyDomain && domain!=="sharklasers.com" ){
        return false;
    }
    return true;
}

export const loginUser=async({email})=>{
    try {
        if(validEmail(email)){
            console.log("valid email")
            const isuser=await employeeModel.findOne({email:email});
            if(!isuser){
                const OTP=await sendOTP(email);
                emailOTP.set(email,OTP);
                return {message:`OTP ${OTP} sent successfully to mail ${email}`,isuser:false};
            }
            else{
                return {message:`Please Login`,isuser:true};
            }
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
            return {message:'Email ID authenticated successfully'};
        }
        else{
            throw new Error('OTP not valid') ;
        } 
    }
    catch (error) {
        throw new Error('Error in authenticating User from OTP ');
    }
}

export const passwordUser=async({email,password})=>{
    try {
        const isuser=await employeeModel.findOne({email:email});
        const name=email.split('_')[0];
        const role=email.split('_')[1].split('@')[0];

        if(isuser){
            const ispassword=await bcrypt.compare(password,isuser.password);
            if(!ispassword)return "Invalid Password"
            const token=jwt.sign({
            userName:isuser.name,
            userEmail:isuser.email,
            userRole:isuser.role,
            userStatus:isuser.status
        },process.env.secretKey);
        }
        else{
            const ispassword=await bcrypt.hash(password,10);
            const newEmployee=new employeeModel({name,email,password:ispassword,role});
            await newEmployee.save();
            const token=jwt.sign({
            userName:newEmployee.name,
            userEmail:newEmployee.email,
            userRole:newEmployee.role,
            userStatus:newEmployee.status
        },process.env.secretKey);
        }
        return {message:'User authenticated successfully',token:token};
    } catch (error) {
        throw new Error(error.message);
    }
}