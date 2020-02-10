
const uuid4 = require('uuid/v4');
const  dateFormat = require('dateformat');

// ERROR HELPER
const { successResponse, notFoundError, badRequestError } = require('../utils/utils');

// models interface
const { getAllProviderBetData, getAllUserBetData } = require('../components/models/betting.interface');
const { storeBetting } = require('../components/models/betting.interface');

// all controller
const { ProviderGameMaster } = require('./master_controller'); 
const {getRuleMatch} = require('../controller/rule_controller');
const {getGameMatch} = require('../controller/game');
const {getUsersMatch, deductUserBalance} = require('../controller/user_controller');
const { getPortalProvider } = require('../controller/portalProvider_controller');


const getAllBets = async (req, res) => {

    try {
        const { providerUUID, userUUID, limit, offset, status } = req.body;
        if (!status) {
            res.status(404).send(notFoundError('Status does not exist.'));
        }
        const providerData = await getPortalProvider(providerUUID);
        // Portal provider UUID valid check
        if (!providerData) {
            res.status(404).send(notFoundError('providerUUID does not exist.'));
        }
        //User UUID valid check
        if (!userUUID) {
            // Fetch provider BET History            
            const bettingData = await getAllProviderBetData(providerData.PID, limit, offset, status);
            return res.send(successResponse(bettingData));
        } else {
            //User UUID valid check
            const userData = await getUsersMatch(userUUID);
            if (!userData) {
                res.status(404).send(notFoundError('userUUID does not exist.'));
            }

            // check if user belongs to the provider
            if ((userData.portalProviderID != 1) && userData.portalProviderID != providerData.PID) {
                res.status(400).send(badRequestError('Invalid Game! Please contact your provider.'));
            }

            //Fetching User Bet History
            const bettingData = await getAllUserBetData(userData.PID, limit, offset, status);
            return res.send(successResponse(bettingData));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }

}

const userStoreBetting = async (req, res) => {

    try {
        const { gameUUID, userUUID, ruleID, betAmount, isBot = 0 } = req.body;
        const ruleData = await getRuleMatch(ruleID);
        const gameData = await getGameMatch(gameUUID);
        const userData = await getUsersMatch(userUUID);

        // check ruleID is valid or not
        if (!ruleData) {
            res.status(404).send(notFoundError('ruleID does not exist.'));
        }

        // check gameUUID is valid or not
        if (!gameData) {
            res.status(404).send(notFoundError('Game id does not exist.'));
        }

        // fetch GAME PID
        const gameID = gameData.PID;

        // check USER ID valid or not
        if (!userData) {
            res.status(404).send(notFoundError('UserUID does not exist.'));
        }
        const userID = userData.PID;
        //checking if user betting on game of his own Provider
        const gamingData = await ProviderGameMaster(gameUUID);

        if ((userData.portalProviderID != 1) && userData.portalProviderID != gamingData[0].portalProviderID) {
            res.status(400).send(badRequestError('Invalid Game! Please contact your provider.'));
        }
        // check users balance 
        if (betAmount > userData.balance) {
            res.status(200).send(notFoundError('Not enough balance.'));
        }

        const payout = 1.95;
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
            'UUID': uuid4()
        }

        // store users betting
        const betting = await storeBetting(BettingData);
        // Update users New Balance
        const userUpdateBalance = await deductUserBalance(userID, betAmount);
        res.status(200).send(successResponse(BettingData));

    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
}

module.exports = {
    getAllBets,
    userStoreBetting
}