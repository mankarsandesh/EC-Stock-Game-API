const Currency = require('../models/currency');

async function getAllCurrencies () {
    try {
        const currencies = await Currency.findAll({raw: true});
        return currencies;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

async function updateCurrencyById (data, currencyId) {
    try {
        const currency = await Currency.update(data, {
            where: {PID: currencyId}
        });
        return currency;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getAllCurrencies,
    updateCurrencyById
}