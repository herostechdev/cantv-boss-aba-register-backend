import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CustomNotFoundException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-not-found-exception';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { DocumentsConfigurationService } from 'src/system/configuration/documents/documents-configuration.service';
import { GetLegalDocumentsRequestDto } from './get-legal-documents-request.dto';
import { IGetLegalDocuments } from './get-legal-documents-response.interface';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetLegalDocumentsService extends ExceptionsService {
  constructor(
    private readonly documentsConfigurationService: DocumentsConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super();
  }
  public async get(
    dto: GetLegalDocumentsRequestDto,
  ): Promise<IGetLegalDocuments> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: GetLegalDocumentsService.name,
        method: 'get',
      });
      const response: IGetLegalDocuments = {
        contract: this.getContractDocument(),
        termsAndConditions: this.getTermsAndConditionsDocument(),
      };
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: GetLegalDocumentsService.name,
        method: 'get',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: GetLegalDocumentsService.name,
        method: 'get',
        error: error,
      });
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
