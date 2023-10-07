import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheConfigurationService } from './cache-configuration.service';
import configuration from './cache.configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        CACHE_HOST: Joi.string().default(''),
        CACHE_PORT: Joi.number().default(6379),
        CACHE_PASSWORD: Joi.string().default(''),
        CACHE_TTL: Joi.number().default(300000),
        CACHE_MAX: Joi.number().default(10),
      }),
    }),
  ],
  providers: [ConfigService, CacheConfigurationService],
  exports: [ConfigService, CacheConfigurationService],
})
export class CacheConfigurationModule {}
