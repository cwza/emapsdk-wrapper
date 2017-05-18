/*
 * Throw when searchParams format wrown
 */
class ValidationError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, ValidationError)
    }
}

/*
 * Throw when emapsdk return http status which is not 200
 */
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