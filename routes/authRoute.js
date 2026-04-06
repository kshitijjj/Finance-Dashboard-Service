import express from 'express';
import {userLogin,userOTP,userPassword} from '../controllers/authController.js';

const route=express.Router();

route.get('/',(req,res)=>{
    console.log("hello")
})
route.post('/login',userLogin);
route.post('/login/otp',userOTP);
route.post('/login/password',userPassword);

export default route;