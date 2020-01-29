const DynamicOdds = require('../models/dynamicOdds');

async function getDynamicPayout (ruleID) {
    try {
        const ruleMatch = await DynamicOdds.findOne({
            where: {
                PID: ruleID
            },
            raw: true
        });
        return ruleMatch;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getDynamicPayout
}