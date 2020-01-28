const Stock = require('../models/stock');

async function getAllStock () {
    try {
        const stock = await Stock.findAll({ raw: true });
        return rule;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getAllStock
}