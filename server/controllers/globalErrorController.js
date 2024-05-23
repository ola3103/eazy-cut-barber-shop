const globalErrorController = (err, req, res, next) => {
  const errObject = {
    status: "fail",
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong please try again later",
  };

  if (err.name === "ValidationError") {
    const errString = Object.values(err.errors).map((el) => el.message);
    errObject.message = `Invalid Input:  ${errString.join(". ")}`;
    errObject.statusCode = 400;
  }

  if (err.code === 11000) {
    if (Object.keys(err.keyValue)[0] === "email") {
      const value = err.keyValue.email;
      errObject.message = `user already exist`;
      errObject.statusCode = 400;
    }
    if (Object.keys(err.keyValue)[0] === "bookingDateAndTime") {
      const value = err.keyValue.bookingDateAndTime;
      errObject.message = `The date and time ${value} is already taken please select another date`;
      errObject.statusCode = 400;
    }
  }

  if (err.name === "CastError") {
    errObject.statusCode = 404;
    errObject.message = `Service with id: ${err.value} cannot be found`;
  }

  return res.status(errObject.statusCode).json({
    status: errObject.status,
    message: errObject.message,
    error: err,
    errorStack: err.stack,
  });
};

module.exports = globalErrorController;
