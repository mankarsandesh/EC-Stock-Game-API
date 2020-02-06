const express = require('express');
const adminRouter = express.Router();
const {serverError, successResponse, badRequestError} = require('../utils/utils');
const validate = require('../middleware/validators/validate');

adminRouter.post('/login', async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
});

module.exports = adminRouter;