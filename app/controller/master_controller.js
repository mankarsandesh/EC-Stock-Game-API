const { QueryTypes } = require('sequelize');
const db = require('../db/db');
const {getProviderGameMaster} = require('../components/models/master.interface');


const ProviderGameMaster = async (gameUUID) => {
    try {       
        const Game = await getProviderGameMaster(gameUUID);
        return Game;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}
module.exports = {
    ProviderGameMaster
}