const express = require('express');
const bettingRouter = express.Router();
const {getRuleMatch} = require('../controller/rule');
const {getGameMatch} = require('../controller/game');
const {getUsersMatch,deductUserBalance} = require('../controller/user');
const { findDynamicPayout } = require('../controller/dynamicOdds'); 
const { getProviderGameMaster } = require('../controller/master'); 
const {responseHandler, errorHandler} = require('../utils/utils');
const uuid4 = require('uuid/v4');


var dateFormat = require('dateformat');
bettingRouter.post('/storeBet', async (req, res) => {
    try {

        const { gameUUID, userUUID, ruleID, betAmount,isBot } = req.body;      
        if(gameUUID,userUUID,ruleID,betAmount){
            const findRule = await getRuleMatch(ruleID);
            const findGame = await getGameMatch(gameUUID);
            const userData = await getUsersMatch(userUUID);
            
            const BotValue = 0;
            
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
            const usedID = userData.PID;
             //checking if user betting on game of his own Provider
            const gameData = await getProviderGameMaster(gameUUID);
           
            if((userData.portalProviderID != 1) && userData.portalProviderID != gameData[0].portalProviderID){
                res.status(500).send(errorHandler(false, 500, 'Failed', 'Invalid Game! Please contact your provider.'));               
            }
            // check users balance 
            if(betAmount > userData.balance){
                res.status(200).send(responseHandler(true,200,'Success','Not enough balance.'));
            }

            const payoutValue = 1.95;
            var now = new Date();
            const createdDate = dateFormat(now, "yyyy-mm-d");
            const createdTime = dateFormat(now, "H:MM:ss");
           
            
            // const payoutData = await findDynamicPayout(GameID,ruleID);
            
            const BettingData = {
                'gameID' : GameID,
                'userID' : usedID,
                'ruleID' : ruleID,
                'betAmount' : betAmount,
                'isBot' : BotValue,
                'payout' : payoutValue,
                'source' : 1,
                'createdDate' : createdDate,
                'createdTime' : createdTime,
                'UUID' : uuid4()
            }
            const userUpdateBalance = await deductUserBalance(usedID,betAmount);
           
            console.log(userUpdateBalance);            
            res.status(200).send(responseHandler(true,200,'Success',BettingData));
        }else{           
            res.status(500).send(errorHandler(false, 500, 'Failed', 'Something Went Wrong. Please Check Your Filed.'));
        }
        // const findProvider = await getPortalProvider(providerUUID);
        // return res.send(responseHandler(true, 200, 'Success', currencies));
    }catch(error) {
      console.log(error);
      res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});



module.exports = bettingRouter;