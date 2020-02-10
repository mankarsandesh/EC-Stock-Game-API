const ruleModel = require('../../models/rule');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');


const getAllRule  =  async () => {
    try {  
        const allRule = await ruleModel.findAll({ raw: true });             
        return allRule;               
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}
module.exports = {
    getAllRule
}