const {body, validationResult} = require('express-validator/check');
const {notFoundError} = require('../../utils/utils');

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
      body('betAmount', 'betAmount Should be number.').isNumeric()      
  ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    res.status(404).send(notFoundError(extractedErrors));    
  }

module.exports = {
  validateGetBetting,
  validateBetting,
  validate
}