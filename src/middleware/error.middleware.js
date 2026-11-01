function errorMiddleware (err, req, res, next) {
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    success: false,
    status : err.status || "error",
    message: err.isOperational ? err.message: 'Internal Server error'
  });
};

module.exports = errorMiddleware;