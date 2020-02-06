const {body} = require('express-validator');

const validateGetBetting = () => {
    return [
        body('providerUUID', 'providerUUID is required').exists(),
        body('status', 'status is required').exists()       
    ]
}
const validateBetting = () => {
  return [
      body('gameUUID', 'gameUUID is required').exists(),
      body('userUUID', 'userUUID is required').exists(),
      body('ruleID', 'ruleID is required').exists(), 
      body('betAmount', 'betAmount is required').exists(),  
      body('betAmount', 'betAmount Should be greater than 0 and less than 1,00,000 .').isInt({ gt:0, lt:100000 }) 
   ]
}

module.exports = {
  validateGetBetting,
  validateBetting
}