const UserSessions = require('../models/userSessions');

async function storeSession (userPID, userIpAddress, balance) {
    try {
        const session = await UserSessions.create({
            userID: userPID,
            userIpAddress,
            balance
        }, { raw: true });
        return session;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function getUserSessionByPID (userPID) {
    try {
        const userSession = await UserSessions.findOne({
            where: {
                userID: userPID
            },
            raw: true
        });
        return userSession;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function deleteUserSessionByPID (userPID) {
    try {
        const deleteSession = await UserSessions.destroy({
            where: {
                userID: userPID
            },
            raw: true
        });
        if (deleteSession) {
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
    storeSession,
    getUserSessionByPID,
    deleteUserSessionByPID
}