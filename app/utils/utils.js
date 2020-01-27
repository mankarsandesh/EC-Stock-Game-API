function responseHandler (status, code, message, data) {
    return {
        status,
        code,
        message,
        data
    }
}

function errorHandler (status, code, message, error) {
    return {
        status,
        code,
        message,
        error
    }
}

module.exports = {
    responseHandler,
    errorHandler
}