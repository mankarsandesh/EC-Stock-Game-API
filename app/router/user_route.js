const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const uploadImage = require('../middleware/imageUpload/imageUpload');
const {getPortalProvider} = require('../controller/portalProvider_controller');
const {getUser, storeUser, userLogin, logoutUser, getUserDetails, updateUser} = require('../controller/user_controller');
const {successResponse, serverError, badRequestError} = require('../utils/utils');
const {validateUserLogin, validateUserLogout, validateGetUser, validateUpdateUser} = require('../middleware/validators/user');
const validate = require('../middleware/validators/validate');

// Config for image upload
const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/.(jpg|jpeg|png|svg)$/)) {
            req.fileError = 'Please upload a jpg, jpeg, png or svg image file';
            return cb(null, false);
        }
        cb(undefined, true);
    }
});

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
            return res.status(200).send(successResponse(logout));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

userRouter.get('/users', validateGetUser(), validate, async (req, res) => {
    try {
        const portalProviderUUID = req.query.portalProviderUUID;
        const userUUID = req.query.userUUID;
        const user = await getUserDetails(portalProviderUUID, userUUID);
        if (user.error) {
            return res.status(400).send(badRequestError(user.error));
        }
        return res.send(successResponse(user));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

userRouter.put('/users', upload.single('profileImage'), validateUpdateUser(), validate, uploadImage, async (req, res) => {
    try {
        const userUUID = req.body.userUUID;
        delete req.body.portalProviderUUID;
        delete req.body.userUUID;
        const updatedUser = await updateUser(userUUID, req.body);
        if(updatedUser.error) {
            return res.status(500).send(serverError(false, 500, updateUser.error));
        } else {
            res.send(successResponse(updatedUser));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = userRouter;