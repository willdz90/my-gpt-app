// server/middlewares/errorHandler.js
module.exports = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
      message: 'Ocurrió un error interno en el servidor.',
      error: err.message,
    });
  };
  