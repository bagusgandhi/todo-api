const errRes = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    data: {},
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 400;
  err.status = err.status || 'Bad Request';
  errRes(err, res);
};
