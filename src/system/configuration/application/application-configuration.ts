import { registerAs } from '@nestjs/config';

export default registerAs('application', () => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  routesPrefix: process.env.APP_ROUTES_PREFIX,
  routesTimeout: process.env.APP_REQUEST_TIMEOUT,
  routesOffset: process.env.APP_REQUEST_OFFSET,
  routesFilter: process.env.APP_REQUEST_FILTER,
  routesLimit: process.env.APP_REQUEST_LIMIT,
  maxConcurrentProcess: process.env.APP_MAX_CONCURRENT_PROCESS,
}));
