exports.handleErrors = function (error, req, res, next) {
  console.log(error.stack);
  res.status(error.status || 500)
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack
  })
}