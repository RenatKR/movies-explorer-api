class UnauthorizedError extends Error {
  constructor(message = 'Нет прав') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
