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
    HttpStatusError
}