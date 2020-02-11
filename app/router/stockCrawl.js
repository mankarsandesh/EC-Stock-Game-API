const express = require('express');
const stockCrawlRouter = express.Router();
const {getStockData} = require('../controller/stockCrawl/sh000001');
const {getStockSh000300 } = require('../controller/stockCrawl/sh000300');
const {getStockSz399415 } = require('../controller/stockCrawl/sz399415');
const {getStockUserIndex } = require('../controller/stockCrawl/usindex');
const { getBTC5 } = require('../controller/stockCrawl/btc5');
const { getBTC1 } = require('../controller/stockCrawl/btc1');

const {successResponse,serverError} = require('../utils/utils');


stockCrawlRouter.get('/sh000001', async (req, res) => {
    try {
        const stock = await getStockData();       
        return res.send(successResponse(stock));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

stockCrawlRouter.get('/sh000300', async (req, res) => {
    try {
        const stock = await getStockSh000300();       
        return res.send(successResponse(stock));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

stockCrawlRouter.get('/sz399415', async (req, res) => {
    try {
        const stock = await getStockSz399415();       
        return res.send(successResponse(stock));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

stockCrawlRouter.get('/usindex', async (req, res) => {
    try {
        const stock = await getStockUserIndex();       
        return res.send(successResponse(stock));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

stockCrawlRouter.get('/btc5', async (req, res) => {
    try {
        const stock = await getBTC5();       
        return res.send(successResponse(stock));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

stockCrawlRouter.get('/btc1', async (req, res) => {
    try {
        const stock = await getBTC1();       
        return res.send(successResponse(stock));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = stockCrawlRouter;