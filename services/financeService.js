import financeModel from '../models/finance.js';
import deleteCache from '../middleware/cache.js';
import { response } from 'express';

export const responseGet = async ({page=0,limit=0}) => {
    let records;
    try{
        const pageNum=parseInt(page);
        const limitNum=parseInt(limit);
        const skip=(pageNum-1)*limitNum;
        if(pageNum && limitNum){
            records=await financeModel.find().skip(skip).limit(limitNum);
        }
        else records=await financeModel.find();
        return records;
    }
    catch (error) {
        throw new Error(`Error in fetching the financial records ${error.message}`);
    }
}

export const recordsIdGet = async ({ id }) => {
    try {
        const response = await financeModel.findById(id);
        return response;
    } catch (error) {
        throw new Error(`${error.message}`)
    }
}

export const recordsAdd = async (key, { userId }, { amount, financeType, category, notes }) => {
    try {
        const record = new financeModel({ userId: userId, amount, financeType, category, notes });
        await deleteCache(key);
        await record.save();
        return { message: "Financial record added successfully" };
    } catch (error) {
        throw new Error(`Error in adding the financial record ${error.message}`);
    }
}

export const recordsUpdate = async (key,{ userId }, { id }, { amount, financeType, category, notes }) => {
    let updateObject = {};
    if (amount) updateObject['amount'] = amount;
    if (financeType) updateObject['financeType'] = financeType
    if (category) updateObject['category'] = category
    if (notes) updateObject['notes'] = notes
    console.log(updateObject);
    try {
        await deleteCache(key);
        await financeModel.findOneAndUpdate({_id:id,userId:userId},updateObject);
        return {message:"Financial record updated successfully"};
    } catch (error) {
        throw new Error(error.message);
    }
}

export const recordsDelete = async (key,{ userId }, { id }) => {
    try {
        await deleteCache(key);
        await financeModel.findOneAndDelete({ userId: userId, _id: id });
        return { message: "Financial record deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
}

export const recordsSearch = async ({ userId }, { date, financeType, category }) => {
    let searchObject = {};
    if (date) searchObject['date'] = date;
    if (financeType) searchObject['financeType'] = financeType
    if (category) searchObject['category'] = category
    try {
        const records = await financeModel.find(searchObject);
        return records;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const summary=async()=>{
    try {
        const groupByType=await financeModel.aggregate([{$group:{_id:['$financeType','$category'],totalAmount:{$sum:'$amount'}}}]);
        const groupByDate=await financeModel.aggregate([{$group:{_id:['$date','$financeType'],total:{$sum:'$amount'}}}])

        const MonthlyTrends=[];
        let monthlyIncome=0;
        let monthlyExpense=0;
        let object={};

        groupByDate.map((data)=>{
            const date=data._id[0];
            const month=date.toLocaleString('en-us',{month:'short'});
            const year=date.toLocaleString('en-us',{year:'numeric'});
            const monthYear=`${month}-${year}`;

            if(!object[monthYear]){
                object[monthYear]={
                    'income':monthlyIncome+(data._id[1]==='Income'?data.total:0),
                    'expense':monthlyExpense+(data._id[1]==='Expense'?data.total:0)
                }
            }
            else{
                object[monthYear].income=object[monthYear].income+(data._id[1]==='Income'?data.total:0),
                object[monthYear].expense=object[monthYear].expense+(data._id[1]==='Expense'?data.total:0)
            }
        })
        MonthlyTrends.push(object);
        let summaryByCategory=[];
        let totalIncome=0;let totalExpense=0;

        groupByType.map((data)=>{
            if(data._id[0]==='Income')totalIncome+=data.totalAmount;
            if(data._id[0]==='Expense')totalExpense+=data.totalAmount;
            summaryByCategory.push({
                "category":data._id[1],
                "totalIncome":data._id[0]==='Income'?data.totalAmount:0,
                "totalExpense":data._id[0]==='Expense'?data.totalAmount:0
            });
        })
        console.log(groupByDate);
        return {
            "totalIncome":totalIncome,
            "totalExpense":totalExpense,
            "netBalance":totalIncome-totalExpense,
            "categoryWiseTotal":summaryByCategory,
            "MonthlyTrends":MonthlyTrends
        }
    } catch (error) {
        throw new Error(error.message);
    }
}