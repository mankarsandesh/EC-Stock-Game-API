const express = require('express');
const bettingRouter = express.Router();
const {getRuleMatch} = require('../controller/rule');
const {getGameMatch} = require('../controller/game');
const {responseHandler, errorHandler} = require('../utils/utils');

bettingRouter.post('/storeBet', async (req, res) => {
    try {

        const { gameUUID, userUUID, ruleID, betAmount } = req.body;      
        if(gameUUID,userUUID,ruleID,betAmount){
            const findRule = await getRuleMatch(ruleID);
            const findGame = await getGameMatch(gameUUID);
           
            if(findRule){

                if(findGame){
                        res.status(200).send(responseHandler(true,200,'Success','Betting Successfully.'));
                }else{
                    res.status(500).send(errorHandler(false, 500, 'Failed', 'Check Game UUID.'));
                }
                
            }else{
                res.status(500).send(errorHandler(false, 500, 'Failed', 'Check Game Rule ID.'));
            }
           

        }else{            
            
            res.status(500).send(errorHandler(false, 500, 'Failed', 'Something Went Wrong. Please Check Your Filed.'));
        
        }


        console.log(gameUUID);
        // const findProvider = await getPortalProvider(providerUUID);
        // return res.send(responseHandler(true, 200, 'Success', currencies));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});



module.exports = bettingRouter;