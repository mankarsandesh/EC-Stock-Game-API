const express = require('express');
const userRouter = express.Router();
const {responseHandler, errorHandler} = require('../utils/utils');


// User login
userRouter.post('/user', async (req, res) => {
    try {
        const userBody = req.body;
        const portalProvider = await getPortalProviderById(userBody.portalProviderID);
    } catch (error) {
        console.log(error);
        res.status(500).send(errorHandler(false, 500, 'Failed', 'Internal Server Error'));
    }
});

module.exports = userRouter;