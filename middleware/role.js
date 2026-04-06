export const viewerAccess=async(req,res,next)=>{
    try {
        if(req.user.userRole!=='finance')next();
        else {
            return res.status(401).json('User Unauthorised')
        };
    } catch (error) {
        throw new Error('')
    }
}

export const analystAccess=async(req,res,next)=>{
    try {
        if(req.user.userRole==='finance'){
            next();
        }
        else {
            return res.status(401).json('User Unauthorised')
        };
    } catch (error) {
        throw new Error('')
    }
}

export const adminAccess=async(req,res,next)=>{
    try {
        if(req.user.userRole==='finance' && req.user.userName==='admin')next();
        else {
            return res.status(401).json('User Unauthorised')
        };
    } catch (error) {
        throw new Error('')
    }
}

