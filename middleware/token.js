import jwt from 'jsonwebtoken';

export const verifyToken=async(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader)return res.status(401).json('Token not found');

    try {
        const token=authHeader.split(' ')[1];
        const decode=jwt.decode(token,process.env.secretKey);
        req.user=decode;
        next();
    } catch (error) {
        throw new Error('Error in decoding the token');
    }
}

export default verifyToken;