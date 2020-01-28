const StockModel = require('../models/stock');

async function getAllStock () {
    try {
        const stock = await StockModel.findAll({ raw: true });
        return stock;
    } catch (error) {
    
        throw new Error();
    }
}

module.exports = {
    getAllStock
}