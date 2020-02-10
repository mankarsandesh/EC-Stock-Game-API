const express = require('express');
const currencyRouter = express.Router();
const currencyController = require('../controller/currency_controller');
const {successResponse, serverError} = require('../utils/utils');


// fetch all currency
currencyRouter.get('/currency', currencyController.getAllCurrency );

module.exports = currencyRouter;