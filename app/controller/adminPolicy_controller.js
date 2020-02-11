const AdminPolicy = require('../models/adminPolicy');
const {findAdminPolicyByPID} = require('../components/models/adminPolicy.interface');


async function adminPolicyByPID (adminPolicyPID) {
    try {
        const adminPolicy = await findAdminPolicyByPID(adminPolicyPID);
        return adminPolicy;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    adminPolicyByPID
}