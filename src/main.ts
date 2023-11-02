import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { createPool, initOracleClient } from 'oracledb';
import { AppModule } from './app.module';
import { ApplicationConfigurationService } from './system/configuration/application/application-configuration.service';
import helmet from 'helmet';
import { HashService } from './system/infrastructure/security/encryption/hash.service';
import { IsIPAllowedService } from './is-ip-allowed/is-ip-allowed.service';
import { OracleConfigurationService } from './system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from './oracle/oracle.constants';

const test = (app: INestApplication) => {
  const hashService: HashService = app.get(HashService);
  const text = 'Cantv2023';
  console.log('MD5 Standard toString()   >>', hashService.md5(text).toString());
  console.log(
    'MD5 CryptoJS.enc.Base64   >>',
    hashService.md5Base64(text).toString(),
  );
  console.log(
    'MD5 CryptoJS.enc.Hex      >>',
    hashService.md5Hex(text).toString(),
  );
  console.log(
    'HASH                      >>',
    hashService.hashing(text).toString(),
  );
};

const spTest = async (app: INestApplication) => {
  const service: IsIPAllowedService = app.get(IsIPAllowedService);
  await service.isIPAllowed({ ip: '124.47.3.5' });
};

const initializePipes = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      transform: true,
      whitelist: true,
    }),
  );
  return app;
};

const initializeOracleDatabaseClient = async (app: INestApplication) => {
  // Initialize Oracle Client
  const oracleConfigurationService: OracleConfigurationService = app.get(
    OracleConfigurationService,
  );
  const clientOpts = { libDir: oracleConfigurationService.oracleHome };
  initOracleClient(clientOpts);
  // Initialize connection pool
  const connectionString = `${oracleConfigurationService.uri}:${oracleConfigurationService.port}/${oracleConfigurationService.sid}`;
  await createPool({
    poolAlias: OracleConstants.POOL_ALIAS,
    user: oracleConfigurationService.username,
    password: oracleConfigurationService.password,
    connectionString: connectionString,
    poolMax: oracleConfigurationService.poolMaxConnections,
    poolMin: oracleConfigurationService.poolMinConnections,
  });
};

const startServer = async (app: INestApplication) => {
  const applicationConfigurationService: ApplicationConfigurationService =
    app.get(ApplicationConfigurationService);
  app.setGlobalPrefix(applicationConfigurationService.routesPrefix);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true, parameterLimit: 30 }));
  await app.listen(applicationConfigurationService.port);
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  initializePipes(app);
  await initializeOracleDatabaseClient(app);
  // test(app);
  // await spTest(app);
  await startServer(app);
};

bootstrap();
