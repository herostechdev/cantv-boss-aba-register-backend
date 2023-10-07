import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'body-parser';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ApplicationConfigurationService } from './system/configuration/application/application-configuration.service';
import helmet from 'helmet';
import { HashService } from './system/infrastructure/security/encryption/hash.service';

// async function bootstrap() {
//   console.log(CryptoJS.MD5('Cantv2023').toString());
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

const test = (app: INestApplication) => {
  // CipherService
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
  // console.log();
  // console.log('test');
  // const service: CRMGetCustomerRequestPayloadService = app.get(
  //   CRMGetCustomerRequestPayloadService,
  // );
  // console.log('xml document');
  // const document = service.get({
  //   functionName: 'obtenerclienteCRM',
  //   body: {
  //     CUST_ID: '1000122965',
  //   } as ICRMGetCustomerRequestBody,
  // } as ICRMGetCustomerRequestData);
  // console.log(document);
  // console.log('==============================');
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

const startServer = async (app: INestApplication) => {
  const applicationConfigurationService: ApplicationConfigurationService =
    app.get(ApplicationConfigurationService);
  app.setGlobalPrefix(applicationConfigurationService.routesPrefix);
  app.enableCors();
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true, parameterLimit: 30 }));
  // process.env.TZ = 'America/Caracas';
  // process.env.TZ = 'UTC';
  // app.use(csurf());
  await app.listen(applicationConfigurationService.port);
};

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  initializePipes(app);
  await startServer(app);
  test(app);
};

bootstrap();
