const {body} = require('express-validator');

const validateAdminLogin = () => {
    return [
        body('username', 'username should be provided').exists().notEmpty().trim(),
        body('password', 'password should be provided').exists().notEmpty().trim()
    ];
}

module.exports = {
    validateAdminLogin
}