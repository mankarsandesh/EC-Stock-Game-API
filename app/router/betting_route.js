const express = require('express');
const bettingRouter = express.Router();
const bettingController = require('../controller/betting_controller'); 
const {validateGetBetting, validateBetting} = require('../middleware/validators/betting');
const validate = require('../middleware/validators/validate');
const sourceRequest = require('../middleware/source/source');

 

// Fetch Current Running betting Data BetStatus  = -1
bettingRouter.post('/getAllBets', validateGetBetting(), validate, bettingController.getAllBets );

// User can Betting Rule and Game ID wise
bettingRouter.post('/storeBet',sourceRequest, validateBetting(), validate, bettingController.userStoreBetting);

module.exports = bettingRouter;