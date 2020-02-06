const AdminPolicy = require('../models/adminPolicy');

async function findAdminPolicyByPID (adminPolicyPID) {
    try {
        const adminPolicy = await AdminPolicy.findOne({ where: { PID: adminPolicyPID }, raw: true });
        return adminPolicy;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    findAdminPolicyByPID
}