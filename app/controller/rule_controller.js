const Rule = require('../models/rule');
const {getAllRule} = require('../components/models/rule.interface');
const { notFoundError, successResponse,serverError} = require('../utils/utils');
const { getPortalProvider } = require('./portalProvider_controller');

const getAllGameRule = async (req, res) => {
    try {        
        const providerUUID = req.body.providerUUID;
        const findProvider = await getPortalProvider(providerUUID);
         if(!findProvider){
            res.send(notFoundError('Provider Unable to Find.')); 
         }
         const Rule = await getAllRule();   
        res.send(successResponse(Rule)); 
    }catch(error){
        console.log(error);
        res.send(serverError());
    }

}

async function getRuleMatch (ruleID) {
    try {
        const ruleMatch = await Rule.findOne({
            where: {
                PID: ruleID
            },
            raw: true
        });
        return ruleMatch;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
}

module.exports = {
    getAllGameRule,
    getRuleMatch
}