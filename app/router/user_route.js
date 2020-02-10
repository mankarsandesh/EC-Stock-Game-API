const express = require('express');
const userRouter = express.Router();
const multer = require('multer');
const uploadImage = require('../middleware/imageUpload/imageUpload');
const {getPortalProvider} = require('../controller/portalProvider_controller');
const userController = require('../controller/user_controller');
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
userRouter.post('/users/login', validateUserLogin(), validate, userController.userCreate );

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