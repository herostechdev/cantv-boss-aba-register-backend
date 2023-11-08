import * as fs from 'fs';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { DocumentsConfigurationService } from 'src/system/configuration/documents/documents-configuration.service';
import { IGetLegalDocuments } from './get-legal-documents-response.interface';

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
    return null;
  }

  private getTermsAndConditionsDocument(): string {
    return null;
  }
}
