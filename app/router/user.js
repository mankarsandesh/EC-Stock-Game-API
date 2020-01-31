const express = require('express');
const userRouter = express.Router();
const {getPortalProvider} = require('../controller/portalProvider');
const {getUserPolicyById} = require('../controller/userPolicy');
const {getUser, storeUser} = require('../controller/user');
const {successResponse, serverError, badRequestError} = require('../utils/utils');
const {validateUser, validate} = require('../middleware/validators/user');

// User login
userRouter.post('/users', validateUser(), validate, async (req, res) => {
    try {
        const userBody = req.body;
        const provider = await getPortalProvider(userBody.providerId);
        if(!provider) {
            return res.status(400).send(badRequestError('Invalid Portal provider Id'));
        }
        const userPolicy = await getUserPolicyById(userBody.userPolicyID);
        if(!userPolicy) {
            return res.status(400).send(badRequestError('Invalid User Policy ID'));
        }
        const isUser = await getUser(userBody.portalProviderUserID, userBody.portalProviderID);
        if(isUser) {
            return res.status(400).send(badRequestError('User already exists'));
        }
        userBody.portalProviderID = provider.PID;
        const user = await storeUser(userBody);
        if(user.error) {
            return res.status(400).send(badRequestError(user.error));
        }
        return res.send(successResponse(user));
    }catch(error){
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = userRouter;