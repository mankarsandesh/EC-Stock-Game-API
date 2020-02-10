const portalModel = require('../../models/portalProvider');
const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');


const checkPortalProvider  =  async (providerUUID) => {
    try {
        const provider = await portalModel.findOne({
            where: {UUID: providerUUID},
            raw : true
        });
        return provider;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}
module.exports = {
    checkPortalProvider
}