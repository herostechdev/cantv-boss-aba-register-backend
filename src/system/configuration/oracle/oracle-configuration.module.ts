import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './oracle.configuration';
import { OracleConfigurationService } from './oracle-configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().default('oracle'),
        DATABASE_URI: Joi.string().default(''),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().default(''),
        DB_PASSWORD: Joi.string().default(''),
        DB_DATABASE: Joi.string().default(''),
        DB_SID: Joi.string().default(''),
        DB_ENTITIES: Joi.string().default(''),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
  ],
  providers: [ConfigService, OracleConfigurationService],
  exports: [ConfigService, OracleConfigurationService],
})
export class OracleConfigurationModule {}
