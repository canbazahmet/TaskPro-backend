import { HttpError } from 'http-errors';

import { env } from '../utils/env.js';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isProd = env('NODE_ENV', 'development') === 'production';

  if (err instanceof HttpError) {
    res.status(status).json({
      status,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    error: isProd ? undefined : err.message,
    stack: isProd ? undefined : err.stack,
  });
};
