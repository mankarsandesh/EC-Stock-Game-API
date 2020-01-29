const express = require('express');
const ruleRouter = express.Router();
const { notFoundError, successResponse,serverError} = require('../utils/utils');
const { getPortalProvider } = require('../controller/portalProvider');
const { getAllGameRule } = require('../controller/rule'); 

ruleRouter.post('/getAllRules', async (req, res) => {
    try {        
        const providerUUID = req.body.providerUUID;           
        const findProvider = await getPortalProvider(providerUUID);
         if(!findProvider){
            res.send(notFoundError('Provider Unable to Find.')); 
         }else{
            const allRule = await getAllGameRule();
            res.send(successResponse(allRule)); 
         }
    } catch (error) {
        console.log(error);
        res.send(serverError());
    }
});

module.exports = ruleRouter;