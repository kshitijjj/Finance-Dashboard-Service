export const viewerAccess=async(req,res,next)=>{
    try {
        if(req.user.role!=='finance')next();
        else {
            return res.status(401).json('User Unauthorised')
        };
    } catch (error) {
        throw new Error('')
    }
}

export const analystAccess=async(req,res,next)=>{
    try {
        if(req.user.role==='finance')next();
        else {
            return res.status(401).json('User Unauthorised')
        };
    } catch (error) {
        throw new Error('')
    }
}

export const adminAccess=async(req,res,next)=>{
    try {
        if(req.user.role==='finance' && req.user.name==='admin')next();
        else {
            return res.status(401).json('User Unauthorised')
        };
    } catch (error) {
        throw new Error('')
    }
}

