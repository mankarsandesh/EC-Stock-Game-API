const express = require('express');
const adminRouter = express.Router();
const {serverError, successResponse, badRequestError} = require('../utils/utils');
const {validateAdminLogin} = require('../middleware/validators/admin');
const validate = require('../middleware/validators/validate');
const {providerLogin} = require('../controller/admin');
const {generateAuthToken} = require('../utils/authToken/authToken');

adminRouter.post('/login', validateAdminLogin(), validate, async (req, res) => {
    try {
        const admin = await providerLogin(req.body.username, req.body.password);
        if(admin.error) {
            return res.status(admin.code).send(badRequestError(false, admin.code, 'Failed', admin.error));
        }
        const token = await generateAuthToken(admin.PID);
        return res.send(successResponse({ admin, token }, 'You are successfully logged in'));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = adminRouter;