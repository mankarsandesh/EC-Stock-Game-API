const express = require('express');
const userRouter = express.Router();
const {getPortalProvider} = require('../controller/portalProvider');
const {getUserPolicyById} = require('../controller/userPolicy');
const {getUser, storeUser, userLogin, logoutUser} = require('../controller/user');
const {successResponse, serverError, badRequestError} = require('../utils/utils');
const {validateUserLogin, validateUserLogout, validate} = require('../middleware/validators/user');

// User login
userRouter.post('/users/login', validateUserLogin(), validate, async (req, res) => {
    try {
        const userBody = req.body;
        const provider = await getPortalProvider(userBody.portalProviderUUID);
        if(!provider) {
            return res.status(400).send(badRequestError('Invalid Portal provider Id'));
        }
        userBody.portalProviderID = provider.PID;
        const isUser = await getUser(userBody.portalProviderUserID, userBody.portalProviderUUID);
        if(isUser) {
            console.log(isUser);
            const login = await userLogin(userBody.balance, isUser, provider);
            console.log(login, 'user exists--------------------------------------------------');
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
            console.log(login, 'user created-------------------------------------');
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

userRouter.get('/users/logout', validateUserLogout(), validate, async (req, res) => {
    try {
        const userUUID = req.query.userUUID;
        const logout = await logoutUser(userUUID);
        if(logout.error) {
            return res.status(400).send(badRequestError(logout.error));
        } else {
            return res.status(200).send(logout);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = userRouter;