const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const Sequelize = require('sequelize');
const moment = require('moment');
const sharp = require('sharp');
const fs = require('fs');
const db = require('../db/db');
const { QueryTypes } = require('sequelize');
const {decreaseMainBalance, increaseMainBalance, increaseCreditBalance, decreaseCreditBalance, getPortalProvider, getActivePortalProvider, getPortalProviderByPID} = require('../controller/portalProvider');
const {storeSession, getUserSessionByPID, deleteUserSessionByPID} = require('../controller/userSessions');

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
async function storeUser ({portalProviderUserID, portalProviderID, userPolicyID=1, firstName=null, middleName=null, lastName=null, email=null, password=null, balance=0}) {
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
            balance: 0,
            lastCalledTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            lastIP: '10.10.10.10',
            loginTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            UUID: uuidv4()
        }, { 
            raw: true
        });
        return user.dataValues;
    } catch (error) {
        console.log(error);
        return {error: error.errors[0].message}
    }
}

async function userLogin(balance, user, provider) {
    try {
        if(provider.mainBalance >= balance && provider.isActive=='active' && user.isActive =='active' || provider.name == 'TNKMaster') {
            const userSession = await getUserSessionByPID(user.PID);
            if(userSession) {
                return {error: 'User already have a session. Please wait for 5 minutes'}
            }
            await decreaseMainBalance(balance, provider.PID);
            await increaseUserBalance(balance, user.PID);
            await User.update({
                isLoggedIn: true,
                loginTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }, {
                where: {
                    UUID: user.UUID
                },
                raw: true
            });
            await storeSession(user.PID, user.lastIP, balance);
            return 'User Successfully logged in';
        } else {
            return {error: 'Login not permitted: Insufficient funds in portal provider balance'}
        }
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function logoutUser (userUUID) {
    try {
        const user = await User.findOne({
            where: {
                UUID: userUUID
            },
            raw: true
        });
        if(!user) {
            return {error: 'Invalid User'}
        }
        const userSession = await getUserSessionByPID(user.PID);
        if(!userSession) {
            return {error: 'User session not available'}
        }
        if(user.balance > userSession.balance) {
            const winningAmount = user.balance - userSession.balance;
            const provider = await getActivePortalProvider(user.portalProviderID);
            await increaseMainBalance(user.balance, provider.PID);
            await increaseCreditBalance(winningAmount, provider.PID);
        } else {
            const losingAmount = user.balance - userSession.balance;
            const provider = await getActivePortalProvider(user.portalProviderID);
            await increaseMainBalance(user.balance, provider.PID);
            await decreaseCreditBalance(losingAmount, provider.PID);
        }
        const updateUser = await User.update({
            isLoggedIn: 'false',
            logoutTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            activeMinutes: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            balance: Sequelize.literal(`balance - ${user.balance}`)
        }, {
            where: {
                PID: user.PID
            },
            raw: true
        });
        await deleteUserSessionByPID(user.PID);
        return 'User logged out successfully';
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function increaseUserBalance (balance, userPID) {
    try {
        const increaseBalance = await User.update({ balance: Sequelize.literal(`balance + ${parseInt(balance)}`) }, {
            where: { PID: userPID },
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

// async function getUserById (userUUID) {
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

async function getUserDetails(portalProviderUUID, userUUID) {
    try {
        const provider = await getPortalProvider(portalProviderUUID);
        if(!provider) {
            return {error: 'Portal provider with given UUID does not exist'}
        }
        const user = await User.findOne({
            where: {
                UUID: userUUID
            },
            attributes: ['PID','loginTime','portalProviderID','userPolicyID','firstName','lastName','email','profileImage','balance','isLoggedIn','isActive'],
            raw: true
        });
        if(!user) {
            return {error: 'User does not exist'}
        }
        if(user.portalProviderID != 1 && user.portalProviderID != provider.PID) {
            return {error: 'Invalid Request! Please contact your provider'}
        }
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

async function updateUser (userUUID, data) {
    try {
        const update = await User.update(data, {
            where: {
                UUID: userUUID
            },
            raw: true
        });
        if(update) {
            const updatedUser = await getUsersMatch(userUUID);
            return updatedUser;
        } else {
            return { error: 'User details not updated successfully' }
        }
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    storeUser,
    userLogin,
    logoutUser,
    increaseUserBalance,
    getUser,
    getUsersMatch,
    deductUserBalance,
    getUserDetails,
    updateUser
}