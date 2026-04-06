import {responseGet,recordsIdGet,recordsAdd,recordsDelete,recordsUpdate,recordsSearch,summary} from '../services/financeService.js';

export const getRecords=async(req,res)=>{
    try {
        const getResponse=await responseGet(req.query);
        return res.status(200).json(getResponse);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export const getRecordsId=async(req,res)=>{
    try {
        const getIdResponse=await recordsIdGet(req.params);
        return res.status(200).json(getIdResponse);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json('Error in getting the records');
    }
}

export const addRecords=async(req,res)=>{
    try {
        const addResponse=await recordsAdd(req.originalUrl,req.user,req.body);
        return res.status(201).json(addResponse);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const updateRecords=async(req,res)=>{
    try {
        const updateResponse=await recordsUpdate(req.originalUrl,req.user,req.params,req.body);
        return res.status(201).json(updateResponse);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const deleteRecords=async(req,res)=>{
    try {
        const deleteResponse=await recordsDelete(req.originalUrl,req.user,req.params);
        return res.status(201).json(deleteResponse);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const searchRecords=async(req,res)=>{
    try {
        const searchResponse=await recordsSearch(req.user,req.query);
        return res.status(200).json(searchResponse);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

export const getSummary=async(req,res)=>{
    try {
        const summaryResponse=await summary();
        return res.status(200).json(summaryResponse);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}