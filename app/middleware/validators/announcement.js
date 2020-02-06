const {body} = require('express-validator');

const validateAnnouncement = () => {
    return [
        body('providerUUID', 'providerUUID is required').exists(),
        body('adminID', 'adminID is required').exists(),
        body('title', 'title is required').exists(),
        body('message', 'message is required').exists(),       
    ]
}

module.exports = {
  validateAnnouncement
}