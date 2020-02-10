const StockModel = require('../../models/stock');
const { QueryTypes } = require('sequelize');
const db = require('../../db/db');


const fetchStockList  =  async (req, res) => {
    try {  
        const stockList = await StockModel.findAll({ raw: true });               
        return stockList;               
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

const fetchStockAnalysis  =  async (userId) => {
    try { 
        const stock = await db.query(`SELECT s.name,COUNT(CASE WHEN bet.betResult = 1 THEN bet.betResult END) AS winBet,COUNT(CASE WHEN bet.betResult = 0 THEN bet.betResult END) AS loseBet,COUNT(bet.PID) as totalBet,ROUND((COUNT(CASE WHEN bet.betResult = 1 THEN bet.betResult END)/COUNT(bet.PID))*100,2) as winRate FROM betting bet LEFT JOIN game g ON bet.gameID=g.PID LEFT JOIN stock s ON g.stockID=s.PID WHERE bet.userID = :userId `,
        { 
        replacements: { userId: userId},
        type: QueryTypes.SELECT
        }); 
        return stock;               
    } catch (error) {
        console.log(error);
        throw new Error(error.message);     
    }
}
module.exports = {
    fetchStockList,
    fetchStockAnalysis
}