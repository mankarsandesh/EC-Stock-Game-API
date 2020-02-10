const express = require('express');
const gameRouter = express.Router();
const { notFoundError, successResponse,serverError} = require('../utils/utils');
const { getPortalProvider  } = require('../controller/portalProvider_controller');
const { getAllGameByProviderID } = require('../controller/game');

// Get Game provider UUID wise
gameRouter.post('/getGames', async (req, res) => {
    try {       
        const { providerUUID, limit, offset, status} = req.body;   
       
        const providerData = await getPortalProvider(providerUUID);
        console.log(providerData);
         if(!providerData){
            res.send(notFoundError('Provider UUID does not exist.')); 
         }
        const response  = await getAllGameByProviderID(providerData.PID,limit,offset,status);
        res.send(successResponse(response)); 
         
    } catch (error) {
        console.log(error);
        res.send(serverError());
    }
});

module.exports = gameRouter;