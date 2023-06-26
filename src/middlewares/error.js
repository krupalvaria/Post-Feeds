const handleError = (err, res) => {
  const { statusCode, message } = err;
  if (statusCode) {
    res.status(statusCode).json({
      status: statusCode,
      message
    });
  } else {
    res.status(statusCode);
  }
};

module.exports = {
  handleError
};
