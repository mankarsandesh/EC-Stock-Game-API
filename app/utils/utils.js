function responseHandler (status=true, code=200, message='Success', data) {
    return {
        status,
        code,
        message,
        data
    }
}

function errorHandler (status=false, code, message, error) {
    return {
        status,
        code,
        message,
        data
    }
}


module.exports = {
    responseHandler,
    errorHandler
}