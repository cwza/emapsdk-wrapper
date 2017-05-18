class ValidationError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, ValidationError)
    }
}

class HttpStatusError extends Error {
    constructor(statusCode, ...args) {
        super(...args)
        Error.captureStackTrace(this, HttpStatusError)
        this.statusCode = statusCode
    }
}

module.exports = {
    ValidationError, HttpStatusError
}