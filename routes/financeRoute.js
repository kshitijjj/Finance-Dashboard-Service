import express from 'express';
import verifyToken from '../middleware/token.js';
import {cacheMiddleware} from '../middleware/cache.js';
import {getRecords,addRecords,getRecordsId,searchRecords,updateRecords,deleteRecords,getSummary} from '../controllers/financeController.js';
import { analystAccess,adminAccess } from '../middleware/role.js';

const route=express.Router();

route.get('/dashboard',verifyToken,cacheMiddleware(45),getSummary);
route.get('/search',verifyToken,analystAccess,cacheMiddleware(40),searchRecords);
route.get('/',verifyToken,analystAccess,cacheMiddleware(40),getRecords);
route.post('/',verifyToken,adminAccess,addRecords);
route.get('/:id',verifyToken,cacheMiddleware(40),getRecordsId);
route.put('/:id',verifyToken,adminAccess,updateRecords);
route.delete('/:id',verifyToken,adminAccess,deleteRecords);

export default route;
