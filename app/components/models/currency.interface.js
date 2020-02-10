const currencyModel = require('../../models/currency');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');


const allCurrency  =  async () => {
    try {
        const currency = await currencyModel.findAll({raw: true});
        return currency;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}


module.exports = {
    allCurrency
}