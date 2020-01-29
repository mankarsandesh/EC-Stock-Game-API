const express = require('express');
const bettingRouter = express.Router();
const {getRuleMatch} = require('../controller/rule');
const {getGameMatch} = require('../controller/game');
const {getUsersMatch} = require('../controller/user');
const { findDynamicPayout } = require('../controller/dynamicOdds'); 
const { getProviderGameMaster } = require('../controller/master'); 
const {responseHandler, errorHandler} = require('../utils/utils');

bettingRouter.post('/storeBet', async (req, res) => {
    try {

        const { gameUUID, userUUID, ruleID, betAmount } = req.body;      
        if(gameUUID,userUUID,ruleID,betAmount){
            const findRule = await getRuleMatch(ruleID);
            const findGame = await getGameMatch(gameUUID);
            const userData = await getUsersMatch(userUUID);
            
            // check ruleID is valid or not
            if(!findRule){               
                res.status(500).send(errorHandler(false, 500, 'Failed', 'ruleID does not exist.'));
            }

            // check gameUUID is valid or not
            if(!findGame){               
                res.status(500).send(errorHandler(false, 500, 'Failed', 'Game id does not exist.'));  
            }
            // fetch GAME PID
            const GameID = findGame.PID;
            // check USER ID valid or not
            if(!userData){
                res.status(500).send(errorHandler(false, 500, 'Failed', 'UserUID does not exist.'));
            }
           

             //checking if user betting on game of his own Provider
            const gameData = await getProviderGameMaster(gameUUID);
           
            if((userData.portalProviderID != 1) && userData.portalProviderID != gameData[0].portalProviderID){
                res.status(500).send(errorHandler(false, 500, 'Failed', 'Invalid Game! Please contact your provider.'));               
            }
            // check users balance 
            if(betAmount > userData.balance){
                res.status(200).send(responseHandler(true,200,'Success','Not enough balance.'));
            }

            const payout = 1.95;

           

            
            // const payoutData = await findDynamicPayout(GameID,ruleID);
           res.status(200).send(responseHandler(true,200,'Success','Betting.'));

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