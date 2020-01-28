const portalProvider = require('../models/portalProvider');

async function getPortalProvider (providerUUID) {
    try {
        const provider = await portalProvider.findOne({
            where: {UUID: providerUUID},
            raw : true
        });
        return provider;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getPortalProvider
}
