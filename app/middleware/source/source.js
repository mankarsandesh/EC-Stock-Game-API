const {body} = require('express-validator');

const sourceRequest = async (req,res,next) => {
    try{
        const userAgent  = req.headers['user-agent']; 

        if(userAgent.includes('Postman')){
            source =  1;
        }else if(userAgent.includes('Chrome')){
            source =  2;
        }else if(userAgent.includes('iPhone')){
            source =  3;
        }else if(userAgent.includes('Android')){
            source =  4;
        }else{
            source = 1;
        }
        console.log(source);
        return next();
    }catch(error){
        console.log(error);
        res.status(500).send(serverError());
    }
}

module.exports = sourceRequest;