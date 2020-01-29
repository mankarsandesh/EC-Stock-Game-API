const express = require('express');
const currencyRouter = express.Router();
const {getAllCurrencies, updateCurrencyById} = require('../controller/currency');
const {successResponse, serverError} = require('../utils/utils');

currencyRouter.get('/currency', async (req, res) => {
    try {
        const currencies = await getAllCurrencies();
        return res.send(successResponse(currencies));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

currencyRouter.put('/currency/:id', async (req, res) => {
    try {
        const updated = await updateCurrencyById(req.body, req.params.id);
        return res.send(successResponse(updated));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
})

module.exports = currencyRouter;