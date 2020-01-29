const User = require('../models/user');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const db = require('../db/db');
const { QueryTypes } = require('sequelize');

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
}