import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AbaRegisterGetLegalDocumentsRequestDto } from './aba-register-get-legal-documents-request.dto';
import { BossConstants } from 'src/boss/boss.constants';
import { CustomNotFoundException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-not-found-exception';
import { DocumentsConfigurationService } from 'src/system/configuration/documents/documents-configuration.service';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { IAbaRegisterGetLegalDocuments } from './aba-register-get-legal-documents-response.interface';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { WLogHelper } from 'src/system/infrastructure/winston-logger/wlog.helper';

@Injectable()
export class AbaRegisterGetLegalDocumentsService extends ExceptionsService {
  constructor(
    private readonly documentsConfigurationService: DocumentsConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super();
  }

  private readonly wlog = new WLogHelper(
    AbaRegisterGetLegalDocumentsService.name,
  );

  public async get(
    dto: AbaRegisterGetLegalDocumentsRequestDto,
  ): Promise<IAbaRegisterGetLegalDocuments> {
    this.wlog.methodName = 'get';
    this.wlog.dto = dto;
    try {
      this.wlog.info(BossConstants.START);
      const response: IAbaRegisterGetLegalDocuments = {
        contract: this.getContractDocument(),
        termsAndConditions: this.getTermsAndConditionsDocument(),
      };
      this.wlog.info(BossConstants.END);
      return response;
    } catch (error) {
      this.wlog.error(error);
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
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
        command: BossConstants.LEGAL_CONTRACT_DOCUMENT,
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
        command: BossConstants.LEGAL_TERMS_AND_CONDITIONS_DOCUMENT,
      });
    }
  }
}
