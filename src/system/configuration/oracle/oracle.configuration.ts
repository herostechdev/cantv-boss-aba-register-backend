import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: process.env.DB_TYPE,
  uri: process.env.DB_URI,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  sid: process.env.DB_SID,
  entities: process.env.DB_ENTITIES,
  synchronize: process.env.DB_SYNCHRONIZE,
}));
