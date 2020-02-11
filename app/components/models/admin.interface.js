const adminModel = require('../../models/admin');


const adminCheck  =  async (username) => {
    try {
        const admin = await adminModel.findOne({
            where: { username },
            raw: true
        });
        return admin;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    adminCheck
}