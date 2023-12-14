import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './application-configuration';
import { ApplicationConfigurationService } from './application-configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        APP_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_PORT: Joi.number().default(45000),
        APP_ROUTES_PREFIX: Joi.string().default('api'),
        APP_REQUEST_TIMEOUT: Joi.number().default(30000),
        APP_REQUEST_OFFSET: Joi.number().default(0),
        APP_REQUEST_LIMIT: Joi.number().default(500),
        LOG_FOLDER: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, ApplicationConfigurationService],
  exports: [ConfigService, ApplicationConfigurationService],
})
export class ApplicationConfigurationModule {}
