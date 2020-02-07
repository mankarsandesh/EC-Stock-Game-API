const PortalProvider = require('../models/portalProvider');
const Sequelize = require('sequelize');

async function getPortalProvider (providerUUID) {
    try {
        console.log(providerUUID,"sasasasasasasa");
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

async function getActivePortalProvider (providerPID) {
    try {
        const provider = await PortalProvider.findOne({
            where: {
                PID: providerPID,
                isActive: 'active',
                deleted_at: null
            },
            raw : true
        });
        return provider;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function decreaseMainBalance(cutBalance, providerPID) {
    try {
        const decreaseBalance = await PortalProvider.update({
            mainBalance: Sequelize.literal(`mainBalance - ${parseInt(cutBalance)}`)
        }, {
            where: {
                PID: providerPID
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

async function increaseMainBalance(balance, providerPID) {
    try {
        const increaseBalance = await PortalProvider.update({
            mainBalance: Sequelize.literal(`mainBalance + ${parseInt(balance)}`)
        }, {
            where: {
                PID: providerPID
            },
            raw: true
        });
        if(increaseBalance) {
            return true;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

// async function getPortalProviderByPID (providerPID) {
//     try {
//         const provider = await PortalProvider.findOne({ where: { PID: providerPID }, raw: true });
//         return provider;
//     } catch (error) {
//         console.log(error);
//         throw new Error();
//     }
// } 

async function increaseCreditBalance (balance, providerPID) {
    try {
        const increaseBalance = await PortalProvider.update({
            creditBalance: Sequelize.literal(`creditBalance + ${balance}`)
        }, {
            where: {
                PID: providerPID
            },
            raw: true
        });
        if(increaseBalance) {
            return true;
        } else {
            throw new Error();
        }
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function decreaseCreditBalance (cutBalance, providerPID) {
    try {
        const decreaseBalance = await PortalProvider.update({
            creditBalance: Sequelize.literal(`creditBalance - ${cutBalance}`)
        }, {
            where: {
                PID: providerPID
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
    //getPortalProviderByPID,
    increaseCreditBalance,
    decreaseCreditBalance,
    getActivePortalProvider,
    decreaseMainBalance,
    increaseMainBalance
}
