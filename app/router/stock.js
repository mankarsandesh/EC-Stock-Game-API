const express = require('express');
const stockRouter = express.Router();
const {responseHandler, errorHandler} = require('../utils/utils');
const { getAllStock } = require('../controller/stock');



stockRouter.post('/getStockList', async (req, res) => {
    try {      
        const stockList = await getAllStock();
        console.log(stockList);
        res.send(responseHandler(true,200,'success',stockList));                
    } catch (error) {
        console.log("Hello");
        console.log(error);
        res.status(500).send({error: 'Internal server error'});
    }
});


module.exports = stockRouter;