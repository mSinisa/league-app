class AppError extends Error {
	constructor(message, statusCode) {
		super (message)
		this.statusCode = statusCode
		//set the status based on the status code 
		this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
		// errors that we can predict will happen and setting them to operational
		//if there is another unexpected error it will not have isOperational 
		this.isOperational = true 
		//capture stack trace
		Error.captureStackTrace(this, this.constructor)
	}
}

module.exports = AppError