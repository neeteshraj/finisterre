const HttpStatus = require('http-status-codes');
const CustomError = require('./custom-errors');

class ForbiddenError extends CustomError {
  constructor(message) {
    super({
      message,
      status: HttpStatus.FORBIDDEN,
    });
  }
}

module.exports = ForbiddenError;
