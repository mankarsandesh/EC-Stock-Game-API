const Game = require('../models/game');
const { QueryTypes } = require('sequelize');
const db = require('../db/db');

const { getPortalProvider  } = require('../controller/portalProvider_controller');
const { getAllGameByProviderID ,GameIDCheckMatch } = require('../components/models/game.interface');

const { notFoundError, successResponse,serverError} = require('../utils/utils');


// get all Provider Game Fetch
const  AllGameByProviderID  =  async (req,res) => {
    try {       
        const { providerUUID, limit, offset, status} = req.body;
        const providerData = await getPortalProvider(providerUUID);
        
        if(!providerData){
            res.send(notFoundError('Provider UUID does not exist.')); 
        }        
        const response  = await getAllGameByProviderID(providerData.PID,limit,offset,status);
        res.send(successResponse(response)); 
    
    }catch (error) {
        console.log(error);
        res.send(serverError());
    }
}

// check gameUUID is found or not
async function getGameMatch (gameUUID) {
    try {       
        const checkGame = await GameIDCheckMatch(gameUUID);
        return checkGame;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    AllGameByProviderID,
    getGameMatch   
}