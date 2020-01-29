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
        error
    }
}

function serverErrorHandler (status=false, code=500, message='Failed', error='Internal Server Error') {
    return {
        status,
        code,
        message,
        error
    }
}


module.exports = {
    responseHandler,
    errorHandler,
    serverErrorHandler
}