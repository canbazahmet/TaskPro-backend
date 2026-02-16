import pino from 'pino-http';

import { env } from '../utils/env.js';

const isProd = env('NODE_ENV', 'development') === 'production';

export const logger = pino({
  redact: [
    'req.headers.authorization',
    'req.headers.cookie',
    'req.cookies',
    'res.headers["set-cookie"]',
  ],
  ...(isProd
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
        },
      }),
});
