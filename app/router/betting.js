const express = require('express');
const bettingRouter = express.Router();
const {getRuleMatch} = require('../controller/rule');
const {getGameMatch} = require('../controller/game');
const {getUsersMatch} = require('../controller/user');
const {responseHandler, errorHandler} = require('../utils/utils');

bettingRouter.post('/storeBet', async (req, res) => {
    try {

        const { gameUUID, userUUID, ruleID, betAmount } = req.body;      
        if(gameUUID,userUUID,ruleID,betAmount){
            const findRule = await getRuleMatch(ruleID);
            const findGame = await getGameMatch(gameUUID);
            const findUsers = await getUsersMatch(userUUID);
              
            const GameID = findGame.PID;
            console.log(GameID);
           

            if(findRule){
                if(findGame){
                    if(findUsers){
                        if((findUsers.portalProviderID != 1) && findUsers.portalProviderID != findGame.portalProviderID){
                            res.status(200).send(responseHandler(true,200,'Invalid Game! Please contact your provider.'));
                        }else{
                            if(betAmount > findUsers.balance){
                                res.status(200).send(responseHandler(true,200,'Success','Not enough balance.'));
                            }else{
                                res.status(200).send(responseHandler(true,200,'Success','Not enough balance.'));
                            }                            
                        }                        
                    }else{
                        res.status(500).send(errorHandler(false, 500, 'Failed', 'UserUID does not exist.'));
                    }    
                    
                }else{
                    res.status(500).send(errorHandler(false, 500, 'Failed', 'Game id does not exist.'));
                }
                
            }else{
                res.status(500).send(errorHandler(false, 500, 'Failed', 'ruleID does not exist.'));
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