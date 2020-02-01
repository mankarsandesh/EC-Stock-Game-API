const {body, validationResult} = require('express-validator/check');
const {notFoundError} = require('../../utils/utils');

// validation all filed in user filed
const validateUser = () => {
    return [
        body('balance', 'Balance is required').exists(),
        body('balance', 'Balance Should be Number.').isNumeric(),
        body('portalProviderUserID', 'portalProviderUserID is required').exists(),
        body('portalProviderUUID', 'portalProviderUUID is required').exists(),
        body('portalProviderUUID', 'portalProviderUUID should be valid UUID').isUUID()
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
    validateUser,
    validate
}