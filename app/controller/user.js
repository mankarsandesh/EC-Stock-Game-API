const User = require('../models/user');
const UserSessions = require('../models/userSessions');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const db = require('../db/db');
const { QueryTypes } = require('sequelize');
const {decreaseMainBalance} = require('../controller/portalProvider');
const {storeSession} = require('../controller/userSessions');

async function deductUserBalance(userID,betAmount) {
    try {
        const userBalance = await db.query('UPDATE user SET balance = balance - :Amount WHERE PID = :PID',
        {
          replacements: { Amount: betAmount, PID:userID},
          type: QueryTypes.UPDATE
        });
        return userBalance;
    } catch (error) {
        console.log(error);
        return {error: error.errors[0].message}
    }
}

async function storeUser ({portalProviderUserID, portalProviderUUID, userPolicyID=1, firstName=null, middleName=null, lastName=null, email=null, password=null, balance=0}) {
    try {
        const user = await User.create({
            portalProviderUserID,
            portalProviderID: portalProviderUUID,
            userPolicyID,
            firstName,
            middleName,
            lastName,
            email,
            password,
            balance: 0,
            lastCalledTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            lastIP: '10.10.10.10',
            loginTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            UUID: uuidv4()
        }, { 
            raw: true
        });
        console.log(user);
        return user.dataValues;
    } catch (error) {
        console.log(error);
        return {error: error.errors[0].message}
    }
}

async function userLogin(balance, user, provider) {
    try {
        if(provider.mainBalance >= balance && provider.isActive=='active' && user.isActive =='active' || provider.name == 'TNKMaster') {
            const userSession = await UserSessions.findOne({
                where: {
                    userID: user.UUID
                },
                raw: true
            });
            if(userSession) {
                return {error: 'User already have a session. Please wait for 5 minutes'}
            }
            await decreaseMainBalance(balance, provider.UUID);
            await increaseUserBalance(balance, user.UUID);
            await User.update({
                isLoggedIn: true,
                loginTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }, {
                where: {
                    UUID: user.UUID
                },
                raw: true
            });
            const session = await storeSession(user.PID, user.lastIP, balance);
            return 'User Successfully logged in';
        } else {
            return {error: 'Login not permitted'}
        }
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function increaseUserBalance (balance, UUID) {
    try {
        const user = await User.findOne({ 
            where: { UUID },
            raw: true
        });
        console.log(user);
        const increaseBalance = await User.update({ balance: parseInt(user.balance) + parseInt(balance)}, {
            where: { UUID },
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

// async function getUserById (UUID) {
//     try {
        
//     } catch (error) {
//         console.log(error);
//         throw new Error();
//     }
// }

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
    userLogin,
    increaseUserBalance,
    getUser,
    getUsersMatch,
    deductUserBalance
}