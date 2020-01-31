const express = require('express');
const stockRouter = express.Router();
const {serverError,successResponse} = require('../utils/utils');
const { getAllStock } = require('../controller/stock');

stockRouter.get('/getStockList', async (req, res) => {
    try {      
        const stockList = await getAllStock();       
        res.send(successResponse(stockList));                
    } catch (error) {
        console.log(error);
        res.send(serverError());     
    }
});

stockRouter.get('/stockAnalysis', async (req, res) => {
    try {      
        const stockList = await getAllStock();       
        res.send(successResponse(stockList));                
    } catch (error) {
        console.log(error);
        res.send(serverError());     
    }
});



module.exports = stockRouter;