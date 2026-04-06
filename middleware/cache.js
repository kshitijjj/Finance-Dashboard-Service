import {getCache,setCache} from '../config/cache.js';

export const cacheMiddleware=(ttl)=>{
    return async(req,res,next)=>{
        try {
        const key=req.originalUrl;
        console.log(key)

        const cacheData=await getCache(key);

        if(cacheData){
            return res.json(JSON.parse(cacheData));
        }

        const originalJson=res.json.bind(res);

        res.json = async(data) => {
            await setCache(key,data,ttl);
            return originalJson(data);
        }
        next();
    } 
        catch (error) {
            throw new Error("Error in cache middleware",error.message);
        }
    }
}

export default cacheMiddleware;

