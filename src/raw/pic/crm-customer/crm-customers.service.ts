import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { xml2js } from 'xml-js';
import { BossConstants } from 'src/boss/boss.constants';
import { CRMCustomerDto } from './crm-customer.dto';
import { CRMCustomerInvalidQueryRequestException } from './crm-customer-query-invalid-request.exception';
import { CRMCustomerRequestPayloadService } from './crm-customer-request-payload.service';
import { ICRMCustomerRequestBody } from './crm-customer-request-body.interface';
import { ICRMCustomerResponse } from './crm-customer-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { SoapRequestService } from 'src/soap/requests/soap-request.service';
import { SoapTagTypesConstants } from 'src/soap/requests/soap-tag-types.constants';
import { UpdateDslAbaRegistersRawService } from 'src/raw/database/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class CRMCustomersService extends SoapRequestService<ICRMCustomerResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: CRMCustomerRequestPayloadService,
    private readonly integrationsConfigurationService: IntegrationsConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super();
  }

  async execute(dto: CRMCustomerDto): Promise<ICRMCustomerResponse> {
    this.wlog.className = CRMCustomersService.name;
    this.wlog.methodName = BossConstants.EXECUTE_METHOD;
    this.wlog.dto = dto;
    try {
      this.wlog.info(BossConstants.START);
      this.wlog.info('Validar parámetros de entrada');
      this.validateInput(dto);
      if (dto.customerId) {
        return await this.getClientByCustomerId(dto);
      }
      if (dto.identificationDocument) {
        return await this.getClientByIdentificationDocument(dto);
      }
      return await this.getClientByFiscalNumber(dto);
    } catch (error) {
      this.wlog.error(error);
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      this.exceptionHandler(error);
    }
  }

  private validateInput(dto: CRMCustomerDto): void {
    if (
      !dto ||
      (!dto.customerId && !dto.identificationDocument && !dto.fiscalNumber)
    )
      throw new CRMCustomerInvalidQueryRequestException();
  }

  private async getClientByCustomerId(
    dto: CRMCustomerDto,
  ): Promise<ICRMCustomerResponse> {
    this.wlog.info('Obtiene cliente por ID');
    const response = await this.invoke(dto, { CUST_ID: dto.customerId });
    this.wlog.info(BossConstants.END);
    return response;
  }

  private async getClientByIdentificationDocument(
    dto: CRMCustomerDto,
  ): Promise<ICRMCustomerResponse> {
    this.wlog.info('Obtiene cliente por cédula de identidad');
    const response = await this.invoke(dto, {
      NATIONAL_ID: dto.identificationDocument,
    });
    this.wlog.info(BossConstants.END);
    return response;
  }

  private async getClientByFiscalNumber(
    dto: CRMCustomerDto,
  ): Promise<ICRMCustomerResponse> {
    this.wlog.info('Obtiene cliente por RIF');
    const response = await this.invoke(dto, { TAXPAYER_ID: dto.fiscalNumber });
    this.wlog.info(BossConstants.END);
    return response;
  }

  private get clientQueryUrl(): string {
    return this.integrationsConfigurationService.cu594GetCustomerUrl;
  }

  private async invoke(
    dto: CRMCustomerDto,
    bodyPayload: ICRMCustomerRequestBody,
  ): Promise<ICRMCustomerResponse> {
    this.wlog.info(`Url: ${this.clientQueryUrl}`);
    const response = await this.httpService.axiosRef.post<ICRMCustomerResponse>(
      this.clientQueryUrl,
      this.getBodyPayload(bodyPayload),
      super.getAxiosRequestConfig('CU594consultarCliente'),
    );
    const customerResponse = this.getCustomerResponse(response.data);
    super.validateResponse(
      customerResponse,
      'Error al consultar el cliente en el CRM',
    );
    return customerResponse;
  }

  private getCustomerResponse(data: any): ICRMCustomerResponse {
    const toJson = xml2js(data, {
      compact: true,
    });
    const source =
      toJson['soapenv:Envelope']['soapenv:Body']['ConsultarClienteResponse'][
        'ns1:ConsultarClienteReturn'
      ];
    return {
      CUST_ID: super.getString(source, 'CUST_ID'),
      CTV_ID_PDR_KENAN: super.getString(source, 'CTV_ID_PDR_KENAN'),
      CTV_ID_JRQ_KENAN: super.getString(source, 'CTV_ID_JRQ_KENAN'),
      BUSINESS_UNIT: super.getString(source, 'BUSINESS_UNIT'),
      FIRST_NAME: super.getString(source, 'FIRST_NAME'),
      BO_NAME: super.getString(source, 'BO_NAME'),
      BO_NAME_AC: super.getString(source, 'BO_NAME_AC'),
      LAST_NAME: super.getString(source, 'LAST_NAME'),
      PHONE: super.getString(source, 'PHONE'),
      CTV_PHONE_T1: super.getString(source, 'CTV_PHONE_T1'),
      PHONE1: super.getString(source, 'PHONE1'),
      CTV_PHONE_T2: super.getString(source, 'CTV_PHONE_T2'),
      PHONE2: super.getString(source, 'PHONE2'),
      CTV_PHONE_T3: super.getString(source, 'CTV_PHONE_T3'),
      PHONE30: super.getString(source, 'PHONE30'),
      CTV_PHONE_T4: super.getString(source, 'CTV_PHONE_T4'),
      EMAIL_ADDR: super.getString(source, 'EMAIL_ADDR'),
      COUNTRY: super.getString(source, 'COUNTRY'),
      STATE: super.getString(source, 'STATE'),
      CITY: super.getString(source, 'CITY'),
      CTV_MUNICIPIO: super.getString(source, 'CTV_MUNICIPIO'),
      CTV_CIUDAD: super.getString(source, 'CTV_CIUDAD'),
      ADDRESS1_AC: super.getString(source, 'ADDRESS1_AC'),
      ADDRESS1: super.getString(source, 'ADDRESS1'),
      ADDRESS2: super.getString(source, 'ADDRESS2'),
      ADDRESS3: super.getString(source, 'ADDRESS3'),
      COUNTY: super.getString(source, 'COUNTY'),
      CTV_TYPE: super.getString(source, 'CTV_TYPE'),
      TAXPAYER_ID: super.getString(source, 'TAXPAYER_ID'),
      NATIONAL_ID: super.getString(source, 'NATIONAL_ID'),
      POSTAL: super.getString(source, 'POSTAL'),
      CTV_ROW_ADDED_DTTM: super.getString(source, 'CTV_ROW_ADDED_DTTM'),
      BUSINESS: super.getString(source, 'BUSINESS'),
      ERROR_CODE: super.getString(source, 'ERROR_CODE'),
      ERROR_MESSAGE: super.getString(source, 'ERROR_MESSAGE'),
    };
  }

  private getBodyPayload(bodyPayload: ICRMCustomerRequestBody): any {
    return this.requestPayloadService.get({
      soapTagType: SoapTagTypesConstants.INCLUDE_SOAP_ENV,
      functionName: 'obtenerclienteCRM',
      includeXmlnsObt: true,
      body: bodyPayload,
    });
  }
}
