import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { json, urlencoded } from 'body-parser';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { createPool, initOracleClient } from 'oracledb';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ApplicationConfigurationService } from './system/configuration/application/application-configuration.service';
import { BossHelper } from './boss/boss.helper';
import { OracleConfigurationService } from './system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from './oracle/oracle.constants';
import { Wlog } from './system/infrastructure/winston-logger/winston-logger.service';

const initializePipes = (app: INestApplication) => {
  Wlog.instance.info({
    phoneNumber: null,
    message: 'Inicializando pipes',
    input: null,
    clazz: BossHelper.applicationName,
    method: 'initializePipes',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      transform: true,
      whitelist: true,
    }),
  );
  return app;
};

const initializeOracleDatabaseClient = async (
  app: INestApplication,
  logger: Logger,
) => {
  logger.log('Initializing oracle database client ...');
  Wlog.instance.info({
    phoneNumber: null,
    message: 'Inicializando el cliente de base de datos Oracle',
    input: null,
    clazz: BossHelper.applicationName,
    method: 'initializeOracleDatabaseClient',
  });
  // Initialize Oracle Client
  const oracleConfigurationService: OracleConfigurationService = app.get(
    OracleConfigurationService,
  );
  const clientOpts = { libDir: oracleConfigurationService.oracleHome };
  initOracleClient(clientOpts);
  logger.log('Oracle database client initialized');
  // Initialize connection pool
  initializeOracleDatabasePoolConnections(
    app,
    logger,
    oracleConfigurationService,
  );
  Wlog.instance.info({
    phoneNumber: null,
    message:
      'El cliente base de datos de Oracle ha sido inicializado correctamente',
    input: null,
    clazz: BossHelper.applicationName,
    method: 'initializeOracleDatabaseClient',
  });
};

const initializeOracleDatabasePoolConnections = async (
  app: INestApplication,
  logger: Logger,
  oracleConfigurationService: OracleConfigurationService,
) => {
  logger.log(
    `usePoolConnections: ${oracleConfigurationService.usePoolConnections}`,
  );
  if (!oracleConfigurationService.usePoolConnections) {
    return;
  }
  logger.log('Initalizing oracle database connections pool ...');
  const connectionString = `${oracleConfigurationService.uri}:${oracleConfigurationService.port}/${oracleConfigurationService.sid}`;
  await createPool({
    poolAlias: OracleConstants.POOL_ALIAS,
    user: oracleConfigurationService.username,
    password: oracleConfigurationService.password,
    connectionString: connectionString,
    poolMax: oracleConfigurationService.poolMaxConnections,
    poolMin: oracleConfigurationService.poolMinConnections,
    poolIncrement: oracleConfigurationService.poolIncrement,
    connectTimeout: oracleConfigurationService.connectTimeout,
    poolTimeout: oracleConfigurationService.poolTimeout,
    queueMax: oracleConfigurationService.queueMax,
  });
  logger.log('Oracle database connections pool initialized');
};

const startServer = async (app: INestApplication, logger: Logger) => {
  Wlog.instance.info({
    phoneNumber: null,
    message: 'Iniciando el servidor',
    input: null,
    clazz: BossHelper.applicationName,
    method: 'startServer',
  });
  const applicationConfigurationService: ApplicationConfigurationService =
    app.get(ApplicationConfigurationService);
  logger.log(
    `Routes global prefix: ${applicationConfigurationService.routesPrefix}`,
  );
  app.setGlobalPrefix(applicationConfigurationService.routesPrefix);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true, parameterLimit: 30 }));
  logger.log(`Server port: ${applicationConfigurationService.port}`);
  await app.listen(applicationConfigurationService.port);
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  await initializeOracleDatabaseClient(app, logger);
  logger.log('Initializing pipes');
  initializePipes(app);
  logger.log('Starting server');
  await startServer(app, logger);
};

bootstrap();
