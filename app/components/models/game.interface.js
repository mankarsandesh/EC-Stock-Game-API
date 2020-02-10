const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');
const GameModel = require('../../models/game');
// get all Provider Game Fetch
const getAllGameByProviderID  = async (portalProviderID,limit=100,offset=0,status) => {
    try {       
        const Game = await db.query(`SELECT game.UUID as gameID,stock.name as stockName,game.startDate as gameStartDate,game.startTime as gameStartTime,game.endDate as gameEndDate,game.endTime as gameEndTime,game.gameStatus from game inner join stock on game.stockID = stock.PID inner join providerGameSetup on game.providerGameSetupID = providerGameSetup.PID inner join portalProvider on providerGameSetup.portalProviderID = portalProvider.PID WHERE portalProvider.isActive = 'active' AND providerGameSetup.portalProviderID = :portalProviderID AND game.gameStatus IN (:status) AND  portalProvider.deleted_at IS NULL LIMIT 0,10
        `,
        { 
          replacements: { portalProviderID: portalProviderID,limit:limit,offset:offset,status:status },
          type: QueryTypes.SELECT
        });
        return Game;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

// check gameUUID is found or not
async function GameIDCheckMatch (gameUUID) {
    try {       
        const checkGame = await GameModel.findOne({
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
    GameIDCheckMatch
}