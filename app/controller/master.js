const { QueryTypes } = require('sequelize');
const db = require('../db/db');

async function getProviderGameMaster (gameUUID) {
    try {       
        const Game = await db.query('SELECT game.stockID,game.PID,providerGameSetup.portalProviderID FROM game JOIN  providerGameSetup ON game.providerGameSetupID = providerGameSetup.PID WHERE game.gameStatus= 1 AND ProviderGameSetup.isActive = "active" AND game.UUID= :UUID AND ProviderGameSetup.deleted_at IS NULL',
        {
          replacements: { UUID: gameUUID },
          type: QueryTypes.SELECT
        });
        return Game;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}
module.exports = {
    getProviderGameMaster
}