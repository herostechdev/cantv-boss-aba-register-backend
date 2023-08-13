import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './security.configuration';
import { SecurityConfigurationService } from './security-configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().default(''),
        JWT_TOKEN_EPIRES_IN: Joi.string().default('30s'),
        JWT_TEMPORAL_TOKEN_EPIRES_IN: Joi.string().default('30s'),
        SECURITY_SALT_ROUNDS: Joi.number().default(10),
        SECURITY_CIPHER_PASSWORD: Joi.string(),
        SECURITY_KEY: Joi.string(),
        SECURITY_IV: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, SecurityConfigurationService],
  exports: [ConfigService, SecurityConfigurationService],
})
export class SecurityConfigurationModule {}
