const UserModel = require('../../models/user');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');


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
    userUUIDMatch
}