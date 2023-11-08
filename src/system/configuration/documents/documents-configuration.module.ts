import * as Joi from 'joi';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './documents-configuration';
import { DocumentsConfigurationService } from './documents-configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        LEGAL_DOCUMENTS_FOLDER: Joi.string(),
        CONTRACT_DOCUMENT_NAME: Joi.string(),
        TERMS_AND_CONDITIONS_DOCUMENT_NAME: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, DocumentsConfigurationService],
  exports: [ConfigService, DocumentsConfigurationService],
})
export class DocumentsConfigurationModule {}
