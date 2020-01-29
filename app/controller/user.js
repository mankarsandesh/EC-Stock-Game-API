const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

async function storeUser ({portalProviderUserID, portalProviderID, userPolicyID, firstName=null, middleName=null, lastName=null, email=null, password=null, balance=0}) {
    try {
        const user = await User.create({
            portalProviderUserID,
            portalProviderID,
            userPolicyID,
            firstName,
            middleName,
            lastName,
            email,
            password,
            balance,
            lastCalledTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            lastIP: '10.10.10.10',
            loginTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            UUID: uuidv4()
        }, { 
            raw: true
        });
        return user;
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