import Redis from "ioredis";

const redis=new Redis(process.env.redis_Url);
redis.on('connect',()=>console.log("Redis connected successfully"));
redis.on('error',()=>console.log("Error in redis connection"));

export const getCache=async(key)=>{
    try {
        const data=await redis.get(key);
        if(!data)return null;
        return data;
    } catch (error) {
        throw new Error(`Error in getting cache Data ${error.message}`);
    }   
}

export const setCache=async(key,data,ttl)=>{
    try {
        await redis.set(key,JSON.stringify(data),"EX",ttl);
        console.log('Data cached successfully');
    } catch (error) {
        throw new Error('Error in setting cache',error.message);
    }
}

export const deleteCache=async(key)=>{
    try {
        await redis.del(key);
        console.log('Cache Data deleted');
    } catch (error) {
        throw new Error('Error in deleting cache',error.message);
    }
}

