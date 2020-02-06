const {validationResult} = require('express-validator');
const {notFoundError} = require('../../utils/utils');

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    res.status(400).send(notFoundError(extractedErrors));   
}

module.exports = validate;
