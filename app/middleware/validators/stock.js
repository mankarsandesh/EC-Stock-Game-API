const {body} = require('express-validator');

// validation all filed in user filed
const validateGetStock = () => {
    return [
        body('userUUID', 'userUUID is required').exists()       
    ]
}

module.exports = {
    validateGetStock
}