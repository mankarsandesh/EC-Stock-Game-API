const Game = require('../models/game');

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
    getGameMatch,
    getProviderGameMatch
}