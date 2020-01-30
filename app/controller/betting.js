const BettingModel = require('../models/betting');
const { QueryTypes } = require('sequelize');
const db = require('../db/db');

async function latestBetting (bettingData) {
    try {
        const Betting = await db.query('SELECT * FROM betting WHERE betResult IN (0,1)',
        {          
          type: QueryTypes.SELECT
        });
        return Betting;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}
async function storeBetting (bettingData) {
    try {       
        const Betting = await BettingModel.create(bettingData);
        return Betting;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}
module.exports = {
    storeBetting,
    latestBetting
}