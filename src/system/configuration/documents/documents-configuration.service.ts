import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocumentsConfigurationService {
  constructor(private configService: ConfigService) {}

  get legalDocumentsFolder(): string {
    return this.configService.get<string>('documents.legalDocumentsFolder');
  }

  get contractDocumentName(): string {
    return this.configService.get<string>('documents.contractDocumentName');
  }

  get termsAndConditionsDocumentName(): string {
    return this.configService.get<string>(
      'documents.termsAndConditionsDocumentName',
    );
  }
}
