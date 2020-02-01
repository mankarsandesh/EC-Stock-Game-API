const PortalProvider = require('../models/portalProvider');

async function getPortalProvider (providerUUID) {
    try {
        const provider = await PortalProvider.findOne({
            where: {UUID: providerUUID},
            raw : true
        });
        return provider;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function decreaseMainBalance(cutBalance, UUID) {
    try {
        const provider = await PortalProvider.findOne({ where: { UUID }});
        const decreaseBalance = await PortalProvider.update({
            mainBalance: parseInt(provider.mainBalance) - parseInt(cutBalance)
        }, {
            where: {
                UUID
            },
            raw: true
        });
        if(decreaseBalance) {
            return true;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getPortalProvider,
    decreaseMainBalance
}
