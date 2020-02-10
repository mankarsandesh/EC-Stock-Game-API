const bettingModel = require('../../models/betting');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');

const storeBetting = async (bettingData) => {
    try {
        const Betting = await bettingModel.create(bettingData);
        return Betting;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

const getAllProviderBetData = async (providerUUID, limit = 100, offset = 0, status) => {
    try {
        const Betting = await db.query(`SELECT betting.UUID as betID,rule.name as ruleName,betting.betAmount,betting.rollingAmount,betting.payout,(CASE WHEN betting.betResult = -1 THEN "pending" WHEN betting.betResult = 0 THEN "open" WHEN betting.betResult = 1 THEN "close" ELSE "fail" END) as betResult,betting.createdDate,betting.createdTime,game.UUID as gameID,stock.name as stockName,game.startDate as gameStartDate,game.startTime as gameStartTime,(CASE WHEN gameStatus = 0 THEN 'pending' WHEN gameStatus = 1 THEN 'open' WHEN gameStatus = 2 THEN 'close' WHEN gameStatus = 3 THEN 'complete' WHEN gameStatus = 4 THEN 'pending' ELSE 'fail' END) as gameStatus from betting inner join game on betting.gameID=game.PID inner join user on betting.userID=user.PID inner join portalProvider on user.portalProviderID=portalProvider.PID inner join stock on game.stockID = stock.PID inner join rule on betting.ruleID=rule.PID WHERE user.portalProviderID = :providerUUID AND betting.betResult IN (:status) AND game.gameStatus != 5 AND portalProvider.isActive AND portalProvider.deleted_at IS NULL LIMIT 0,10`,
            {
                replacements: { providerUUID: providerUUID, limit: limit, offset: offset, status: status },
                type: QueryTypes.SELECT
            });
        return Betting;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

const getAllUserBetData = async (userUUID, limit = 100, offset = 0, status) => {
    try {
        const Betting = await db.query(`SELECT betting.UUID as betID,rule.name as ruleName,betting.betAmount,betting.rollingAmount,betting.payout,(CASE WHEN betting.betResult = -1 THEN "pending" WHEN betting.betResult = 0 THEN "open" WHEN betting.betResult = 1 THEN "close" ELSE "fail" END) as betResult,betting.createdDate,betting.createdTime,game.UUID as gameID,stock.name as stockName,game.startDate as gameStartDate,game.startTime as gameStartTime,(CASE WHEN gameStatus = 0 THEN 'pending' WHEN gameStatus = 1 THEN 'open' WHEN gameStatus = 2 THEN 'close' WHEN gameStatus = 3 THEN 'complete' WHEN gameStatus = 4 THEN 'pending' ELSE 'fail' END) as gameStatus from betting inner join game on betting.gameID=game.PID inner join user on betting.userID=user.PID inner join stock on game.stockID = stock.PID inner join rule on betting.ruleID=rule.PID WHERE user.isActive = 'active' AND betting.betResult IN (:status) AND betting.userID = :userUUID AND game.gameStatus != 5 AND user.deleted_at IS NULL LIMIT 0,10`,
            {
                replacements: { userUUID: userUUID, limit: limit, offset: offset, status: status },
                type: QueryTypes.SELECT
            });
        return Betting;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    storeBetting,
    getAllProviderBetData,
    getAllUserBetData
}