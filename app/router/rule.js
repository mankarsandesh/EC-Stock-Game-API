const express = require('express');
const RuleRouter = express.Router();
const {responseHandler, errorHandler} = require('../utils/utils');
const { getPortalProvider } = require('../controller/portalProvider');
const { getAllGameRule } = require('../controller/rule'); 


RuleRouter.post('/getAllRules', async (req, res) => {
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
        res.status(500).send({error: 'Internal server error'});
    }
});


module.exports = RuleRouter;