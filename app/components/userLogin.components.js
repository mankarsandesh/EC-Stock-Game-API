const { getPortalProvider } = require('../controller/portalProvider_controller');
const {successResponse, notFoundError, badRequestError} = require('../utils/utils');


const getAllBets = async (req, res) => {

        try {
            if(provider.mainBalance >= balance && provider.isActive=='active' && user.isActive =='active' || provider.name == 'TNKMaster') {
                const userSession = await getUserSessionByPID(user.PID);
                if(userSession) {
                    return {error: 'User already have a session. Please wait for 5 minutes'}
                }
                await decreaseMainBalance(balance, provider.PID);
                await increaseUserBalance(balance, user.PID);
                await User.update({
                    isLoggedIn: true,
                    loginTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                }, {
                    where: {
                        UUID: user.UUID
                    },
                    raw: true
                });
                await storeSession(user.PID, user.lastIP, balance);
                return 'User Successfully logged in';
            } else {
                return {error: 'Login not permitted: Insufficient funds in portal provider balance'}
            }
        } catch (error) {
            console.log(error);
            throw new Error();
        }
}

module.exports =  {
    getAllBets
}