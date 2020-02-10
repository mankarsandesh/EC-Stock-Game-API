const express = require('express');
const stockRouter = express.Router();
const stockController = require('../controller/stock_controller');
const {validateGetStock} = require('../middleware/validators/stock');
const validate = require('../middleware/validators/validate');

// Get Stock List
stockRouter.get('/getStockList',stockController.stockList);

// User Stock Analysis Data  
stockRouter.post('/stockAnalysis', validateGetStock(), validate, stockController.getStockAnalysis);

module.exports = stockRouter;