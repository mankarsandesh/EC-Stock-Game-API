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

module.exports = {
    storeSession
}