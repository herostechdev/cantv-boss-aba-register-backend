import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
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
      if (dto.customerId)
        return await this.getClientByCustomerId(dto.customerId);
      if (dto.identificationDocument)
        return await this.getClientByIdentificationDocument(
          dto.identificationDocument,
        );
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
    super.validateResponse(
      response.data,
      'Error al consultar el cliente en el CRM',
    );
    return response.data;
  }

  private getBodyPayload(bodyPayload: ICRMCustomerRequestBody): any {
    return this.requestPayloadService.get({
      functionName: 'obtenerclienteCRM',
      body: bodyPayload,
    });
  }
}
