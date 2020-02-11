const {findAdminPolicyByPID} = require('./adminPolicy');

const {adminCheck} = require('../components/models/admin.interface');
const {serverError, successResponse} = require('../utils/utils');
const {generateAuthToken} = require('../utils/authToken/authToken');

const providerLogin = async (req,res) => {
    try {

        const username = req.body.username;
        const password = req.body.password;
        const admin = await adminCheck(username);

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
         
        delete admin.password;
        const token = await generateAuthToken(admin.PID);
       
        return res.send(successResponse({ admin, token }, 'You are successfully logged in'));

    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
}

module.exports = {
    providerLogin
}