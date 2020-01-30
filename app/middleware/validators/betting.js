const {body, validationResult} = require('express-validator/check');


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
  ]
}


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).send({
      errors: extractedErrors,
    })
  }

module.exports = {
  validateGetBetting,
  validateBetting,
  validate
}