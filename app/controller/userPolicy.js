const UserPolicy = require('../models/userPolicy');

async function getUserPolicyById (userPolicyId) {
    try {
        console.log(userPolicyId);
        const userPolicy = await UserPolicy.findOne({
            where: {
                PID: userPolicyId
            },
            raw: true
        });
        return userPolicy;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getUserPolicyById
}