const UserModel = require('../../models/user');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');


const  UserBalanceDeduct = async (userID,betAmount) => {
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


const userUUIDMatch  =  async (userUUID) => {
    try {  
        const checkUsers = await UserModel.findOne({
            where: {
                UUID: userUUID
            },
            raw: true
        });             
        return checkUsers;               
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}


module.exports = {
    UserBalanceDeduct,
    userUUIDMatch
}