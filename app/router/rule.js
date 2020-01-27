const express = require('express');
const RuleRouter = express.Router();
const {responseHandler, errorHandler} = require('../utils/utils');


RuleRouter.post('/getAllRules', async (req, res) => {
    try {
        const providerUUID = req.body.providerUUID;
        console.log(providerUUID);        
        // const currencies = await getAllCurrencies();
        res.send(responseHandler(true,200,'success','providerUUID') ); 
    } catch (error) {
        console.log(error);
        res.status(500).send({error: 'Internal server error'});
    }
});


module.exports = RuleRouter;