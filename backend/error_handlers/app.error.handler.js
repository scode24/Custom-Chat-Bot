const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};

export default errorHandler;
