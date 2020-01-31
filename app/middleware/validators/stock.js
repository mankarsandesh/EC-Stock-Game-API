const {body, validationResult} = require('express-validator/check');
const {notFoundError} = require('../../utils/utils');

// validation all filed in user filed
const validateGetStock = () => {
    return [
        body('userUUID', 'userUUID is required').exists()       
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
    validateGetStock,
    validate
}