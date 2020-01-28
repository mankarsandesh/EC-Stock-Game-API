const express = require('express');
const ruleRouter = express.Router();
const {responseHandler, errorHandler} = require('../utils/utils');
const { getPortalProvider } = require('../controller/portalProvider');
const { getAllGameRule } = require('../controller/rule'); 

ruleRouter.post('/getAllRules', async (req, res) => {
    try {        
        const providerUUID = req.body.providerUUID;           
        const findProvider = await getPortalProvider(providerUUID);
         if(!findProvider){
             console.log("no");
         }else{
            const allRule = await getAllGameRule();
            res.send(responseHandler(true,200,'success',allRule)); 
         }
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

module.exports = ruleRouter;