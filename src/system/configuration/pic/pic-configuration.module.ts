import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './pic-configuration';
import { PICConfigurationService } from './pic-configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PIC_GET_ASAP_ORDER_DETAIL_URL: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, PICConfigurationService],
  exports: [ConfigService, PICConfigurationService],
})
export class PICConfigurationModule {}
