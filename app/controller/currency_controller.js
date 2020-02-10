const {allCurrency} = require('../components/models/currency.interface');
const {successResponse, serverError} = require('../utils/utils');

// fetch all currency 
const getAllCurrency =  async (req, res) => {

    try {
        const currency = await allCurrency();
        return res.send(successResponse(currency));
    } catch (error) {
        console.log(error);
        res.status(500).send(serverError());
    }
}

module.exports = {
    getAllCurrency
}