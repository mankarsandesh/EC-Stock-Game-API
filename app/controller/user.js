const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

<<<<<<< HEAD
async function storeUser ({portalProviderUserID, portalProviderID, userPolicyID, firstName=null, middleName=null, lastName=null, email=null, password=null, balance=0}) {
=======
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
>>>>>>> 4aa500f1e8801463e3efa4a1170067697d5a9951
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