const ruleProvider = require('../models/rule');

async function getAllGameRule (providerUUID) {
    try {
        const rule = await ruleProvider.findAll({ raw: true });
        return rule;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getAllGameRule
}