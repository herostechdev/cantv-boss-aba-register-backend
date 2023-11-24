import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { xml2js } from 'xml-js';
import { CRMCustomerDto } from './crm-customer.dto';
import { CRMCustomerInvalidQueryRequestException } from './crm-customer-query-invalid-request.exception';
import { CRMCustomerRequestPayloadService } from './crm-customer-request-payload.service';
import { ICRMCustomerRequestBody } from './crm-customer-request-body.interface';
import { ICRMCustomerResponse } from './crm-customer-response.interface';
import { SOAPRequestService } from 'src/soap/requests/soap-request.service';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';

@Injectable()
export class CRMCustomersService extends SOAPRequestService<ICRMCustomerResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: CRMCustomerRequestPayloadService,
    private readonly integrationsConfigurationService: IntegrationsConfigurationService,
  ) {
    super();
  }

  async get(dto: CRMCustomerDto): Promise<ICRMCustomerResponse> {
    try {
      this.validateInput(dto);
      if (dto.customerId) {
        return await this.getClientByCustomerId(dto.customerId);
      }
      if (dto.identificationDocument) {
        return await this.getClientByIdentificationDocument(
          dto.identificationDocument,
        );
      }
      return await this.getClientByFiscalNumber(dto.fiscalNumber);
    } catch (error) {
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

  private getClientByFiscalNumber(id: string): Promise<ICRMCustomerResponse> {
    return this.invoke({ TAXPAYER_ID: id });
  }

  private getClientByIdentificationDocument(
    id: string,
  ): Promise<ICRMCustomerResponse> {
    return this.invoke({ NATIONAL_ID: id });
  }

  private getClientByCustomerId(id: string): Promise<ICRMCustomerResponse> {
    return this.invoke({ CUST_ID: id });
  }

  private get clientQueryUrl(): string {
    return this.integrationsConfigurationService.cu594GetCustomerUrl;
  }

  private async invoke(
    bodyPayload: ICRMCustomerRequestBody,
  ): Promise<ICRMCustomerResponse> {
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
      functionName: 'obtenerclienteCRM',
      body: bodyPayload,
    });
  }
}
