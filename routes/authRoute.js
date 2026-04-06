import express from 'express';
import {userLogin,userOTP} from '../controllers/authController.js';

const route=express.Router();

route.get('/',(req,res)=>{
    console.log("hello")
})
route.post('/login',userLogin);
route.post('/login/otp',userOTP);

export default route;