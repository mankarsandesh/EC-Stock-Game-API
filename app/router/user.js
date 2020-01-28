const express = require('express');
const userRouter = express.Router();
const {getPortalProvider} = require('../controller/portalProvider');
const {getUserPolicyById} = require('../controller/userPolicy');
const {getUser, storeUser} = require('../controller/user');
const {responseHandler, errorHandler} = require('../utils/utils');

// User login
userRouter.post('/user', async (req, res) => {
    try {
        const userBody = req.body;
        const provider = await getPortalProvider(userBody.providerId);
        if(!provider) {
            return res.status(400).send(errorHandler(false, 400, 'Failed', 'Invalid Portal provider Id'));
        }
        const userPolicy = await getUserPolicyById(userBody.userPolicyID);
        if(!userPolicy) {
            return res.status(400).send(errorHandler(false, 400, 'Failed', 'Invalid User Policy ID'));
        }
        const isUser = await getUser(userBody.portalProviderUserID, userBody.portalProviderID);
        if(isUser) {
            return res.status(400).send(errorHandler(false, 400, 'Failed', 'User already exists'));
        }
        const user = await storeUser(userBody);
        if(user.error) {
            return res.status(400).send(errorHandler(false, 400, 'Failed', user.error));
        }
        return res.send(responseHandler(true, 200, 'Success', user));
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

module.exports = userRouter;