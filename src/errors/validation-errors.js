const HttpStatus = require('http-status-codes');
const CustomError = require('./custom-errors');

class ValidationError extends CustomError {
  constructor(message) {
    super({
      message,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

module.exports = ValidationError;
