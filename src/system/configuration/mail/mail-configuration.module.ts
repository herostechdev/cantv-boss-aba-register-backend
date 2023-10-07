import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './mail.configuration';
import { MailConfigurationService } from './mail-configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        MAIL_HOST: Joi.string().default(''),
        MAIL_PORT: Joi.string().default(0),
        MAIL_SECURE: Joi.boolean().default(false),
        MAIL_USER: Joi.string().default(''),
        MAIL_PASSWORD: Joi.string().default(''),
      }),
    }),
  ],
  providers: [ConfigService, MailConfigurationService],
  exports: [ConfigService, MailConfigurationService],
})
export class MailConfigurationModule {}
