const Game = require('../models/game');
const { QueryTypes } = require('sequelize');
const db = require('../db/db');

async function getAllGameByProviderID (portalProviderID,limit=100,offset=0,status) {
    try {       
        const Game = await db.query(`game.UUID as gameID,stock.name as stockName,game.startDate as gameStartDate,game.startTime as gameStartTime,game.endDate as gameEndDate,game.endTime as gameEndTime,game.gameStatus
        inner join stock on game.stockID = stock.PID 
        inner join providerGameSetup on game.providerGameSetupID = providerGameSetup.PID
        inner join portalProvider on 
        `,
        { 
          replacements: { providerUUID: providerUUID,limit:limit,offset:offset,status:status },
          type: QueryTypes.SELECT
        });
        return Game;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}


async function getGameMatch (gameUUID) {
    try {       
        const checkGame = await Game.findOne({
            where: {
                UUID: gameUUID,
                gameStatus: 1
            },
            raw: true
        });
        return checkGame;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function getProviderGameMatch (gameUUID) {
    try {       
        const checkGame = await Game.findOne({
            where: {
                UUID: gameUUID,
                gameStatus: 1
            },
            raw: true
        });
        return checkGame;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getAllGameByProviderID,
    getGameMatch,
    getProviderGameMatch
}