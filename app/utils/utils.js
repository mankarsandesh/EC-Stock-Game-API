function successResponse (data, message='success', status=true, code=200) {
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

function serverError (status=false, code=500, message='Failed', error='Internal Server Error') {
    return {
        status,
        code,
        message,
        error
    }
}

function notFoundError (error='Not found', status=false, code=404, message='Failed') {
    return {
        status,
        code,
        message,
        error
    }
}

function badRequestError(error='Bad Request', status=false, code=400, message='Failed') {
    return {
        status,
        code,
        message,
        error
    }
}

function unauthorizedError (error='Unauthorized', status=false, code=401, message='Failed') {
    return {
        status,
        code,
        message,
        error
    }
}


module.exports = {
    successResponse,
    errorHandler,
    serverError,
    notFoundError,
    badRequestError,
    unauthorizedError
}