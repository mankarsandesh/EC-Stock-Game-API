const {body, validationResult, query} = require('express-validator/check');
const {notFoundError} = require('../../utils/utils');

// validation all filed in user filed
const validateUserLogin = () => {
    return [
        body('balance', 'Balance is required').exists().trim(),
        body('balance', 'Balance Should be a positive number').isInt({gt: 0}),
        body('portalProviderUserID', 'portalProviderUserID is required').exists(),
        body('portalProviderUUID', 'portalProviderUUID is required').exists(),
        body('portalProviderUUID', 'portalProviderUUID should be valid UUID').isUUID().trim()
    ]
}

const validateUserLogout = () => {
    return [
        query('userUUID', 'userUUID is required').exists(),
        query('userUUID', 'Invalid userUUID').isUUID()
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    res.status(400).send(notFoundError(extractedErrors));   
}

module.exports = {
    validateUserLogin,
    validateUserLogout,
    validate
}