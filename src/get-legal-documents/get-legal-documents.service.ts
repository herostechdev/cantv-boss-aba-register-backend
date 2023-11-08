import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { DocumentsConfigurationService } from 'src/system/configuration/documents/documents-configuration.service';
import { IGetLegalDocuments } from './get-legal-documents-response.interface';

@Injectable()
export class GetLegalDocumentsService extends ExceptionsService {
  constructor(
    private readonly documentsConfigurationService: DocumentsConfigurationService,
  ) {
    super();
  }
  public get(): IGetLegalDocuments {
    try {
      return {
        contract: this.getContractDocument(),
        termsAndConditions: this.getTermsAndConditionsDocument(),
      };
    } catch (error) {
      super.exceptionHandler(error, 'Documentos Legales');
    }
  }

  private getContractDocument(): string {
    const filePath = path.join(
      this.documentsConfigurationService.legalDocumentsFolder,
      this.documentsConfigurationService.contractDocumentName,
    );
    return fs.readFileSync(filePath, 'utf8');
  }

  private getTermsAndConditionsDocument(): string {
    const filePath = path.join(
      this.documentsConfigurationService.legalDocumentsFolder,
      this.documentsConfigurationService.termsAndConditionsDocumentName,
    );
    return fs.readFileSync(filePath, 'utf8');
  }
}
