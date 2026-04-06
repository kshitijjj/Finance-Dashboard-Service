import { BrevoClient } from "@getbrevo/brevo";
import dotenv from 'dotenv';
dotenv.config();

const client=new BrevoClient({
    apiKey:process.env.brevoAPIKey
})

export const sendOTP=async(mail)=>{
    const Otp=Math.floor(400000 + Math.random()*1000).toString();
    try {
        const result=await client.transactionalEmails.sendTransacEmail({
            subject: 'OTP for Authentication',
            textContent: `Dear User,

            Your One-Time Password (OTP) for authentication is: ${Otp}

            This OTP is valid for 5 minutes. Do not share it with anyone.

            If you did not request this, please ignore this email.

            Regards,
            Team Mayank`,
            sender:{name:"Mayank",email:"rentiqapp@gmail.com"},
            to:[{email:mail}]
        }) 
        return Otp;
    } catch (error) {
        throw new Error('Error in sending otp via brevo',error.message);
    }
}

export default sendOTP;