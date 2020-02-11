const { QueryTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../../db/db');
const AdminPolicyModel = require('../../models/adminPolicy');


const findAdminPolicyByPID = async (adminPolicyPID) => {
    try {
        const adminPolicy = await AdminPolicyModel.findOne({ where: { PID: adminPolicyPID }, raw: true });
        return adminPolicy;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}


module.exports = {
    findAdminPolicyByPID
}