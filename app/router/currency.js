const express = require('express');
const currencyRouter = express.Router();
const {getAllCurrencies, updateCurrencyById} = require('../controller/currency');

currencyRouter.get('/currency', async (req, res) => {
    try {
        const currencies = await getAllCurrencies();
        return res.send(currencies);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

currencyRouter.put('/currency/:id', async (req, res) => {
    try {
        const updated = await updateCurrencyById(req.body, req.params.id);
        return res.send(updated);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

module.exports = currencyRouter;