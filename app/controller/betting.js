const Betting = require('../models/betting');

async function storeBetting (gameUUID) {
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
    storeBetting
}