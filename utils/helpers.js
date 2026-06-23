// Helper to send response quickly
exports.sendSuccessResponse = (res, message, data, statusCode) => {
  return res.status(statusCode || 200).send({
    success: true,
    message,
    data,
  });
};
exports.sendErrorResponse = (
  res,
  message = "Internal server error",
  error,
  statusCode
) => {
  return res.status(statusCode || 500).send({
    success: false,
    message,
    error,
  });
};
