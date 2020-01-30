const express = require('express');
const gameRouter = express.Router();
const { notFoundError, successResponse,serverError} = require('../utils/utils');
const { getPortalProvider ,getAllGameByProviderID } = require('../controller/portalProvider');


gameRouter.post('/getGames', async (req, res) => {
    try {       
        const { providerUUID, limit, offset, status} = req.body;   
       
        const findProvider = await getPortalProvider(providerUUID);
         if(!findProvider){
            res.send(notFoundError('Provider UUID does not exist.')); 
         }
        const response  = await getAllGameByProviderID(findProvider.PID,limit,offset,status);
        res.send(successResponse(response)); 
         
    } catch (error) {
        console.log(error);
        res.send(serverError());
    }
});

module.exports = gameRouter;