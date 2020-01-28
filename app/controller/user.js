const User = require('../models/user');

async function storeUser (data) {
    try {

    } catch (error) {
        console.log(error);
        return {error: error.errors[0].message}
    }
}

async function getUser(portalProviderUserID, portalProviderID) {
    try {
        const user = await User.findOne({
            where: {
                portalProviderUserID,
                portalProviderID
            },
            raw: true
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    storeUser,
    getUser
};