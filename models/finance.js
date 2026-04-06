import mongoose from "mongoose";

const financeSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'employeeModel',
    },
    amount:{
        type:Number,
        required:true
    },
    financeType:{
        type:String,
        enum:['Expense','Income'],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    notes:{
        type:String
    }
},
    {timestamps:true}
)

financeSchema.index({financeType:1,category:1,date:1});

const financeModel=mongoose.model('financeModel',financeSchema);
export default financeModel;