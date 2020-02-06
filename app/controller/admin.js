const Admin = require('../models/admin');
const {findAdminPolicyByPID} = require('../controller/adminPolicy');

async function providerLogin (username, password) {
    try {
        const admin = await Admin.findOne({
            where: { username },
            raw: true
        });
        if(!admin) {
            return { code: 400, error: 'Invalid credentials' }
        }
        if(admin.isActive == 'inactive') {
            return { code: 401, error: 'You are inactive by system admin' }
        }
        const adminPolicy = await findAdminPolicyByPID(admin.adminPolicyID);
        if(!adminPolicy) {
            return { code: 401, error: 'AdminPolicyId does not exist' }
        }
        if(adminPolicy.isActive != 'active' && adminPolicy.isApiAllowed != 'true') {
            return { code: 401, error: 'Admin Policy does not allows you to login' }
        }
        console.log(admin);
        // const isValid = await bcrypt.compare(password, admin.password);
        // if(!isValid) {
        //     return { code: 401, error: 'Invalid username or password' }
        // }
        delete admin.password;
        return admin;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    providerLogin
}