import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  oracleHome: process.env.DB_ORACLE_HOME,
  uri: process.env.DB_URI,
  port: process.env.DB_PORT,
  sid: process.env.DB_SID,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  poolMaxConnections: process.env.DB_POOL_MAX_CONNECTIONS,
  poolMinConnections: process.env.DB_POOL_MIN_CONNECTIONS,
  poolIncrement: process.env.DB_POOL_INCREMENT,
  connectTimeout: process.env.DB_CONNECT_TIMEOUT,
  poolTimeout: process.env.DB_POOL_TIMEOUT,
  queueMax: process.env.DB_QUEUE_MAX,
}));
