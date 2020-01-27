const express = require('express');
const currencyRouter = express.Router();
const {getAllCurrencies, updateCurrencyById} = require('../controller/currency');
const {responseHandler, errorHandler} = require('../utils/utils');

currencyRouter.get('/currency', async (req, res) => {
    try {
        const currencies = await getAllCurrencies();
        return res.send(responseHandler(true, 200, 'Success', currencies));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

currencyRouter.put('/currency/:id', async (req, res) => {
    try {
        const updated = await updateCurrencyById(req.body, req.params.id);
        return res.send(responseHandler(true, 200, 'Success', updated));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
})

module.exports = currencyRouter;