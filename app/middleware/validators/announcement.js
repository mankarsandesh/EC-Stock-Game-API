const {body, validationResult} = require('express-validator/check');
const {notFoundError} = require('../../utils/utils');

const validateAnnouncement = () => {
    return [
        body('providerUUID', 'providerUUID is required').exists(),
        body('adminID', 'adminID is required').exists(),
        body('title', 'title is required').exists(),
        body('message', 'message is required').exists(),       
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
  validateAnnouncement,
  validate
}