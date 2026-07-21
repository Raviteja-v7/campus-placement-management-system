import type { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

import { ApiError } from "../utils/ApiError.js";

export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, _next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors,
    });

    return;
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
