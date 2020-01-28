<<<<<<< HEAD
const PortalProvider = require('../models/portalProvider');


module.exports = {}
=======
const portalProvider = require('../models/portalProvider');

async function getPortalProvider (providerUUID) {
    try {
        const provider = await portalProvider.findOne({
            where: {PID: providerUUID},
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
>>>>>>> c8a393577f921e1d3fd3d116be6794a4d15f0475
