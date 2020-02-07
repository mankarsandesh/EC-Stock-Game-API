const requestPromise = require('request-promise');

async function getBTC5() { 

    try{
        let stockUrl = "https://api.huobi.pro/market/history/kline?period=5min&symbol=btcusdt&size=300";
           
        const res = await requestPromise(stockUrl, {json: true });   
        const arrayData = []; 
        // let finalStock = JSON.parse(data); 

        function timestamp(time){
            // convert unix timestamp to milliseconds
            const ts_ms = time * 1000;
            // initialize new Date object
            const date_ob = new Date(ts_ms);

            // year as 4 digits (YYYY)
            const year = date_ob.getFullYear();

            // month as 2 digits (MM)
            const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

            // date as 2 digits (DD)
            const date = ("0" + date_ob.getDate()).slice(-2);

            // hours as 2 digits (hh)
            const hours = ("0" + date_ob.getHours()).slice(-2);

            // minutes as 2 digits (mm)
            const minutes = ("0" + date_ob.getMinutes()).slice(-2);

            // seconds as 2 digits (ss)
            const seconds = ("0" + date_ob.getSeconds()).slice(-2);

            // date & time as YYYY-MM-DD hh:mm:ss format: 
            const StockDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            return StockDate;
        }
        
        // For Loop for create new Response
        for (i = 0; i < res.data.length; i++) {
            var obj = {};
            const open = res.data[i].open.toString();  
            // it should be convert to timestamp to date    
            const date = timestamp(res.data[i].id);  
            obj['date'] = date;
            obj['no1']  = open.charAt(open.length - 2);  
            obj['no2']  = open.charAt(open.length - 1);       
            obj['PT'] = open;               
            // all object data will store in arrayData 
            arrayData.push(obj);           
        }
        // array will be reverse and latest data will be first
        const stock = arrayData.reverse();  
        // console.log(stock);
        return stock;
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    getBTC5
}