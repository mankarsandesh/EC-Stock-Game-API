const Rule = require('../models/rule');

async function getAllGameRule () {
    try {
        const rule = await Rule.findAll({ raw: true });
        return rule;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function getRuleMatch (ruleID) {
    try {
        const ruleMatch = await Rule.findOne({
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
    getAllGameRule,
    getRuleMatch
}