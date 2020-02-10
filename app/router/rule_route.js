const express = require('express');
const ruleRouter = express.Router();
const ruleController  = require('../controller/rule_controller'); 
const {validateRuleProvider} = require('../middleware/validators/rule');
const validate = require('../middleware/validators/validate');

// fetch all Rule by Portal provider
ruleRouter.post('/getAllRules', validateRuleProvider(), validate, ruleController.getAllGameRule);

module.exports = ruleRouter;