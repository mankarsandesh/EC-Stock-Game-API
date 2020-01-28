const User = require('../models/user');

async function storeUser (data) {
    try {

    } catch (error) {
        console.log(error);
        return {error: error.errors[0].message}
    }
}

module.exports = User;