const express = require('express');
const stockRouter = express.Router();
const {serverError,successResponse} = require('../utils/utils');
const { getAllStock,getStockAnalysis } = require('../controller/stock');
const {getUsersMatch} = require('../controller/user');
const {validateGetStock, validate} = require('../middleware/validators/stock');



stockRouter.get('/getStockList', async (req, res) => {
    try {      
        const stockList = await getAllStock();        
        res.send(successResponse(stockList));                
    } catch (error) {
        console.log(error);
        res.send(serverError());     
    }
});

stockRouter.get('/getStockListCheck', async (req, res) => {
    try {      
        const stockList = await getAllStock();       
        res.send(successResponse(stockList));                
    } catch (error) {
        console.log(error);
        res.send(serverError());     
    }
});


stockRouter.post('/stockAnalysis', validateGetStock(), validate, async (req, res) => {
    try {     
        const userUUID =  req.body.userUUID;
        const userData = await getUsersMatch(userUUID);   
        // check USER ID valid or not
        if(!userData){
            res.status(404).send(notFoundError('UserUID does not exist.'));
        }
        const stockAnalysis = await getStockAnalysis(userData.PID);       
        res.send(successResponse(stockAnalysis));                
    } catch (error) {
        console.log(error);
        res.send(serverError());     
    }
});
module.exports = stockRouter;