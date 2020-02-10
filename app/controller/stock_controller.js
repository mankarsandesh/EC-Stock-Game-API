
const db = require('../db/db');
const {fetchStockList} = require('../components/models/stock.interface');
const {serverError,successResponse} = require('../utils/utils');

const stockList  =  async (req, res) => {
    try {      
        const stock = await fetchStockList();        
        res.send(successResponse(stock));                
    } catch (error) {
        console.log(error);
        res.send(serverError());     
    }
}

const getStockAnalysis  =  async (req, res) => {
    try {      
    
            const userUUID =  req.body.userUUID;
            const userData = await getUsersMatch(userUUID);   
            // check USER ID valid or not     
            if(!userData){
                res.status(404).send(notFoundError('UserUID does not exist.'));
            }
            const getStockAnalysis = await fetchStockAnalysis(userData.PID);
            res.send(successResponse(getStockAnalysis)); 
    } catch (error) {
        console.log(error);
        res.send(serverError());     
    }
}
module.exports = {
    stockList,
    getStockAnalysis
}