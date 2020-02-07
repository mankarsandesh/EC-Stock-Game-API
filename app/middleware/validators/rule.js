const {body} = require('express-validator');

// validation all filed in user filed
const validateRuleProvider = () => {
    return [
        body('providerUUID', 'providerUUID is required').exists()       
    ]
}

module.exports = {
    validateRuleProvider
}