import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerConfigurationService } from './throttler-configuration.service';
import configuration from './throttler.configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        THROTTLER_TTL: Joi.number().default(1),
        THROTTLER_LIMIT: Joi.number().default(5),
      }),
    }),
  ],
  providers: [ConfigService, ThrottlerConfigurationService],
  exports: [ConfigService, ThrottlerConfigurationService],
})
export class ThrottlerConfigurationModule {}
