const jwt = require('jsonwebtoken');

const generateAuthToken = async (adminPID) => {
    try {
        const data = {
            adminPID
        }
        const token = await jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return token;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    generateAuthToken
}