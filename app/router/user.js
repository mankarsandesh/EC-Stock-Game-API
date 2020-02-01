const express = require('express');
const userRouter = express.Router();
const {getPortalProvider} = require('../controller/portalProvider');
const {getUserPolicyById} = require('../controller/userPolicy');
const {getUser, storeUser, userLogin} = require('../controller/user');
const {successResponse, serverError, badRequestError} = require('../utils/utils');
const {validateUser, validate} = require('../middleware/validators/user');

// User login
userRouter.post('/users', validateUser(), validate, async (req, res) => {
    try {
        const userBody = req.body;
        const provider = await getPortalProvider(userBody.portalProviderUUID);
        if(!provider) {
            return res.status(400).send(badRequestError('Invalid Portal provider Id'));
        }
        userBody.portalProviderID = provider.PID;
        const isUser = await getUser(userBody.portalProviderUserID, userBody.portalProviderUUID);
        if(isUser) {
            const login = await userLogin(userBody.balance, isUser, provider);
            console.log(login, 'user pehle se hai--------------------------------------------------')
            if(!login.error) {
                return res.send(successResponse(login));
            } else {
                return res.status(400).send(badRequestError(login.error));
            }
        } else {
            const user = await storeUser(userBody);
            if(user.error) {
                return res.status(400).send(badRequestError(user.error));
            }
            const login = await userLogin(userBody.balance, user, provider);
            console.log(login, 'user naya bana hai')
            if(!login.error) {
                return res.send(successResponse(login));
            } else {
                return res.status(400).send(badRequestError(login.error));
            }
        }
    }catch(error){
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = userRouter;