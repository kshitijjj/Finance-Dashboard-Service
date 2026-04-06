import mongoose from "mongoose";

const employeeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
    status:{
        type:String,
        default:'Active'
    },
},
{timestamps:true}
)

const employeeModel=mongoose.model('employeeModel',employeeSchema);
export default employeeModel;