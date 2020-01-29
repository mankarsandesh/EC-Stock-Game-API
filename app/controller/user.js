const User = require('../models/user');

async function deductUserBalance(userID,betAmount) {
    try {
        const updateUser = await User.update({balance : betAmount},{
            where : { 
                PID : userID
            }
        });
        return updateUser;
    } catch (error) {
        console.log(error);
        return {error: error.errors[0].message}
    }
}

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

async function getUsersMatch (userUUID) {
    try {       
        const checkUsers = await User.findOne({
            where: {
                UUID: userUUID
            },
            raw: true
        });
        return checkUsers;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    storeUser,
    getUser,
    getUsersMatch,
    deductUserBalance
};