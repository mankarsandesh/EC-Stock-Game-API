const requestPromise = require('request-promise');

async function getStockUserIndex() {
    try{
        let stockUrl = "http://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/var%20_DINIW_01=/NewForexService.getOldMinKline?symbol=DINIW&scale=5&datalen=300";

        const res = await requestPromise(stockUrl, {json: true });

        const newData = res.replace("//<script>location.href='http://sina.com.cn'; </script>",'');
        const data = newData.replace("var _DINIW_01=(",'');
        const FinalData = data.replace(")",'');

        const dataFinal = FinalData.replace(/{d:/g,'{"day":').replace(/,o:/g,',"open":').replace(/,h:/g,',"high":').replace(/,l:/g,',"low":').replace(/,c:/g,',"close":').replace(/,p:/g,',"volume":');
        
        const arrayData = []; 
        let finalStock = JSON.parse(dataFinal); 
        console.log(finalStock);
    
        // For Loop for create new Response
        for (i = 0; i < Object.keys(JSON.parse(dataFinal)).length; i++) {
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
    getStockUserIndex
}