const requestPromise = require('request-promise');

async function getStockData() { 
    try{
        let stockUrl = "http://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=sh000001&scale=5&ma=no&datalen=300";

        const res = await requestPromise(stockUrl, {json: true });
       
        const data = res.replace(/{day:/g,'{"day":').replace(/,open:/g,',"open":').replace(/,high:/g,',"high":').replace(/,low:/g,',"low":').replace(/,close:/g,',"close":').replace(/,volume:/g,',"volume":');
    
        const arrayData = []; 
        let finalStock = JSON.parse(data); 
    
        // For Loop for create new Response
        for (i = 0; i < Object.keys(JSON.parse(data)).length; i++) {
            var obj = {};
            const open = finalStock[i].open;            
            obj['date'] = finalStock[i].day;
            obj['no1']  = open.charAt(open.length-2);  
            obj['no2']  = open.charAt(open.length-1);       
            obj['PT'] = open;
    
            // all object data will store in arrayData 
            arrayData.push(obj);           
        }
        // array will be reverse and latest data will be first
        const stock = arrayData.reverse();  
        // console.log(stock);
        return stock;
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    getStockData
}