const express = require('express');
const adminRouter = express.Router();

const {validateAdminLogin} = require('../middleware/validators/admin');
const validate = require('../middleware/validators/validate');


const adminController = require('../controller/admin_controller');

// Main Admin Login
adminRouter.post('/login', validateAdminLogin(), validate, adminController.providerLogin);


module.exports = adminRouter;