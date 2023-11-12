import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './integrations-configuration';
import { IntegrationsConfigurationService } from './integrations-configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PIC_GET_ASAP_ORDER_DETAIL_URL: Joi.string(),
        BOSS_GET_DHCP_DATA_URL: Joi.string(),
        PIC_CUSTOMER_BY_PHONE_NUMBER_URL: Joi.string(),
        PIC_CU594_GET_CUSTOMER: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, IntegrationsConfigurationService],
  exports: [ConfigService, IntegrationsConfigurationService],
})
export class IntegrationsConfigurationModule {}
