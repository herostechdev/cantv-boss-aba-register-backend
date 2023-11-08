import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { DocumentsConfigurationService } from 'src/system/configuration/documents/documents-configuration.service';
import { IGetLegalDocuments } from './get-legal-documents-response.interface';
import { CustomNotFoundException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-not-found-exception';

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
    try {
      const filePath = path.join(
        this.documentsConfigurationService.legalDocumentsFolder,
        this.documentsConfigurationService.contractDocumentName,
      );
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new CustomNotFoundException({
        objectOrError: 'No existe el documento: CONTRATO',
        guid: '93f817de-d72e-491b-8ecc-0d8d9d2b1e01',
      });
    }
  }

  private getTermsAndConditionsDocument(): string {
    try {
      const filePath = path.join(
        this.documentsConfigurationService.legalDocumentsFolder,
        this.documentsConfigurationService.termsAndConditionsDocumentName,
      );
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      throw new CustomNotFoundException({
        objectOrError: 'No existe el documento: TÉRMINOS Y CONDICIONES',
        guid: '88ce02fc-5928-4712-b799-962ee95e0d6c',
      });
    }
  }
}
