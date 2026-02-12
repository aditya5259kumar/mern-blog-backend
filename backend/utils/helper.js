const helper = {
  success: (res, message, data, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message: message,
      data: data,
    });
  },
  error: (res, message, error, statusCode = 400) => {
    return res.status(statusCode).json({
      success: false,
      message: message,
      error: error,
    });
  },
};

export default helper;
