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
import { OracleConfigurationService } from './system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from './oracle/oracle.constants';
import { WLogHelper } from './system/infrastructure/winston-logger/wlog.helper';

const initializePipes = (app: INestApplication, wlog: WLogHelper) => {
  wlog.info('Inicializando pipes');
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
  wlog: WLogHelper,
) => {
  logger.log('Initializing oracle database client ...');
  wlog.info('Inicializando el cliente de base de datos Oracle');
  // Initialize Oracle Client
  const oracleConfigurationService: OracleConfigurationService = app.get(
    OracleConfigurationService,
  );
  const clientOpts = { libDir: oracleConfigurationService.oracleHome };
  initOracleClient(clientOpts);
  logger.log('Oracle database client initialized');
  wlog.info('Cliente de base de datos Oracle inicializado');
  // Initialize connection pool
  initializeOracleDatabasePoolConnections(
    app,
    logger,
    wlog,
    oracleConfigurationService,
  );
  wlog.info(
    'El cliente base de datos de Oracle ha sido inicializado correctamente',
  );
};

const initializeOracleDatabasePoolConnections = async (
  app: INestApplication,
  logger: Logger,
  wlog: WLogHelper,
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

const startServer = async (
  app: INestApplication,
  logger: Logger,
  wlog: WLogHelper,
) => {
  wlog.info('Iniciando el servidor');
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
  const wlog = new WLogHelper('Main', 'bootstrap');
  await initializeOracleDatabaseClient(app, logger, wlog);
  logger.log('Initializing pipes');
  initializePipes(app, wlog);
  logger.log('Starting server');
  await startServer(app, logger, wlog);
};

bootstrap();
