const BettingModel = require('../models/betting');

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
    storeBetting
}