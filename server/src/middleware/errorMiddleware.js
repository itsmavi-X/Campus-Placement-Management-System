import { StatusCodes } from "http-status-codes";

export function notFound(req, res) {
  res.status(StatusCodes.NOT_FOUND).json({ message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong.";

  if (process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
  });
}
