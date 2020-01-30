const BettingModel = require('../models/betting');

async function latestBetting (bettingData) {
    try {       
        const Betting = await BettingModel.findAll({
            where : { betResult : -1 },
            raw: true
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