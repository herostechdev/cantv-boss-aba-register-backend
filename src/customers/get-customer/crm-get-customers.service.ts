import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CRMGetCustomerDto } from './crm-get-customer.dto';
import { CRMGetCustomerInvalidQueryRequestException } from './crm-get-customer-query-invalid-request.exception';
import { CRMGetCustomerRequestPayloadService } from './crm-get-customer-request-payload.service';
import { ICRMGetCustomerRequestBody } from './crm-get-customer-request-body.interface';
import { ICRMGetCustomerResponse } from './crm-get-customer-response.interface';
import { SOAPRequestService } from 'src/soap/requests/soap-request.service';

@Injectable()
export class CRMGetCustomersService extends SOAPRequestService<ICRMGetCustomerResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: CRMGetCustomerRequestPayloadService,
  ) {
    super();
  }

  async getCustomer(dto: CRMGetCustomerDto): Promise<ICRMGetCustomerResponse> {
    try {
      this.validateInput(dto);
      if (dto.customerId)
        return await this.getClientByCustomerId(dto.customerId);
      if (dto.identificacionDocument)
        return await this.getClientByIdentificationDocument(
          dto.identificacionDocument,
        );
      return await this.getClientByFiscalNumber(dto.fiscalNumber);
    } catch (error) {
      this.exceptionHandler(error);
    }
  }

  private validateInput(dto: CRMGetCustomerDto): void {
    if (
      !dto ||
      (!dto.customerId && !dto.identificacionDocument && !dto.fiscalNumber)
    )
      throw new CRMGetCustomerInvalidQueryRequestException();
  }

  private getClientByFiscalNumber(
    id: string,
  ): Promise<ICRMGetCustomerResponse> {
    return this.invoke({ TAXPAYER_ID: id });
  }

  private getClientByIdentificationDocument(
    id: string,
  ): Promise<ICRMGetCustomerResponse> {
    return this.invoke({ NATIONAL_ID: id });
  }

  private getClientByCustomerId(id: string): Promise<ICRMGetCustomerResponse> {
    return this.invoke({ CUST_ID: id });
  }

  private get clientQueryUrl(): string {
    return 'http://picprod04:8800/mule/services/CU594consultarCliente?wsdl=null';
  }

  private async invoke(
    bodyPayload: ICRMGetCustomerRequestBody,
  ): Promise<ICRMGetCustomerResponse> {
    const response =
      await this.httpService.axiosRef.post<ICRMGetCustomerResponse>(
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

  private getBodyPayload(bodyPayload: ICRMGetCustomerRequestBody): any {
    return this.requestPayloadService.get({
      functionName: 'obtenerclienteCRM',
      body: bodyPayload,
    });
  }
}
