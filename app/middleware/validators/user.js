const {body, validationResult} = require('express-validator/check');


const validateUser = () => {
    return [
        body('balance', 'Balance is required').exists(),
        body('portalProviderUserID', 'portalProviderUserID is required').exists(),
        body('portalProviderUUID', 'portalProviderUUID is required').exists()
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
    validateUser,
    validate
}