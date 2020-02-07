const requestPromise = require('request-promise');

async function getStockSh000300() { 


    try{
        let stockUrl = "https://quotes.sina.cn/cn/api/jsonp_v2.php/var%20_sh000001_5_1553569576264=/CN_MarketDataService.getKLineData?symbol=sh000300&scale=5&ma=no&datalen=300";

        const res = await requestPromise(stockUrl, {json: true });       
        const newData = res.replace("/*<script>location.href='//sina.com';</script>*/",'');
        const data = newData.replace("var _sh000001_5_1553569576264=(",'');
        const FinalData = data.replace(");",'');

     
        const arrayData = []; 
        let finalStock = JSON.parse(FinalData); 
        
        // For Loop for create new Response
        for (i = 0; i < Object.keys(JSON.parse(FinalData)).length; i++) {
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
    getStockSh000300
}