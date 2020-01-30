const express = require('express');
const bettingRouter = express.Router();
const {getRuleMatch} = require('../controller/rule');
const {getGameMatch} = require('../controller/game');
const {getUsersMatch,deductUserBalance} = require('../controller/user');
const { findDynamicPayout } = require('../controller/dynamicOdds'); 
const { getProviderGameMaster } = require('../controller/master'); 
const { storeBetting ,getAllUserBetData,getAllProviderBetData } = require('../controller/betting'); 
const { getPortalProvider } = require('../controller/portalProvider');
const {successResponse, errorHandler,notFoundError,badRequestError} = require('../utils/utils');
const uuid4 = require('uuid/v4');
var dateFormat = require('dateformat');



// Fetch Current Running betting Data BetStatus  = -1
bettingRouter.get('/getAllBets', async (req, res) => {
    try {
        const { providerUUID, userUUID, limit, offset,status } = req.body;    
        
          
        const providerData = await getPortalProvider(providerUUID);
        // Portal provider UUID valid check
        if(!providerData){               
            res.status(404).send(notFoundError('providerUUID does not exist.'));
        }
        //User UUID valid check
        if(!userUUID){
           
            // Fetch provider BET History            
            const bettingData = await getAllProviderBetData(providerData.PID,limit,offset,status);
            return res.send(successResponse(bettingData));
        }else{
            //User UUID valid check
            const userData = await getUsersMatch(userUUID);
            if(!userData){               
                res.status(404).send(notFoundError('userUUID does not exist.'));
            } 

            // check if user belongs to the provider
            if((userData.portalProviderID != 1) && userData.portalProviderID != providerData.PID){
                res.status(400).send(badRequestError('Invalid Game! Please contact your provider.'));               
            }
            
            //Fetching User Bet History
            const bettingData = await getAllUserBetData(userData.PID,limit,offset,status);
            return res.send(successResponse(bettingData));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

// User can Betting Rule and Game ID wise
bettingRouter.post('/storeBet', async (req, res) => {
    try {
        const { gameUUID, userUUID, ruleID, betAmount,isBot } = req.body;      
        if(gameUUID,userUUID,ruleID,betAmount){
            const ruleData = await getRuleMatch(ruleID);
            const gameData = await getGameMatch(gameUUID);
            const userData = await getUsersMatch(userUUID);            
            const isBot = 0;
            
            // check ruleID is valid or not
            if(!ruleData){               
                res.status(404).send(notFoundError('ruleID does not exist.'));
            }

            // check gameUUID is valid or not
            if(!gameData){               
                res.status(404).send(notFoundError('Game id does not exist.'));  
            }
            // fetch GAME PID
            const gameID = gameData.PID;
            // check USER ID valid or not
            if(!userData){
                res.status(404).send(notFoundError('UserUID does not exist.'));
            }
            const userID = userData.PID;
             //checking if user betting on game of his own Provider
            const gamingData = await getProviderGameMaster(gameUUID);
           
            if((userData.portalProviderID != 1) && userData.portalProviderID != gamingData[0].portalProviderID){
                res.status(400).send(badRequestError('Invalid Game! Please contact your provider.'));               
            }
            // check users balance 
            if(betAmount > userData.balance){
                res.status(200).send(responseHandler(true,200,'success','Not enough balance.'));
            }

            const payout = 1.95;
            const source = 1;
            var now = new Date();
            const createdDate = dateFormat(now, "yyyy-mm-d");
            const createdTime = dateFormat(now, "H:MM:ss");
           
            // Dynamic Payout will be Fetch
            // const payoutData = await findDynamicPayout(GameID,ruleID);
            
            // store all bet value in BettingData
            const BettingData = {
                gameID,
                userID,
                ruleID,
                betAmount,
                isBot,
                payout,
                source,
                createdDate,
                createdTime,
                'UUID' : uuid4()
            }

            // store users betting
            const betting = await storeBetting(BettingData);

            // Update users New Balance
            const userUpdateBalance = await deductUserBalance(userID,betAmount);

            res.status(200).send(successResponse(BettingData));
        }else{           
            res.status(500).send(errorHandler(false, 500, 'Failed', 'Something Went Wrong. Please Check Your Filed.'));
        }
      
    }catch(error) {
      console.log(error);
      res.status(500).send(serverError());
    }
});

module.exports = bettingRouter;