const DynamicOdds = require('../models/dynamicOdds');
const Rule = require('../models/rule');

async function findDynamicPayout (GameID,ruleID) {
    try {
        const ruleMatch = await Rule.findOne({
            where: {
                PID: ruleID,
                isActive : 'active'
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
    findDynamicPayout
}