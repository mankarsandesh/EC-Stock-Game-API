const express = require('express');
const ruleRouter = express.Router();
const {responseHandler, errorHandler} = require('../utils/utils');

ruleRouter.post('/getAllRules', async (req, res) => {
    try {
        const providerUUID = req.body.providerUUID;
        console.log(providerUUID);        
        res.send(responseHandler(true,200,'success','providerUUID') ); 
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

module.exports = ruleRouter;