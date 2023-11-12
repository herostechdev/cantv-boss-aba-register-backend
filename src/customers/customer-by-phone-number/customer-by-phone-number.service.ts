import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CustomerByPhoneNumberInvalidQueryRequestException } from './customer-by-phone-number-invalid-request.exception';
import { CustomerByPhoneNumberRequestPayloadService } from './customer-by-phone-number-request-payload.service';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number.dto';
import { ICustomerByPhoneNumberRequestBody } from './customer-by-phone-number-request-body.interface';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number-response.interface';
import { SOAPRequestService } from 'src/soap/requests/soap-request.service';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';

@Injectable()
export class CustomerByPhoneNumberService extends SOAPRequestService<ICustomerByPhoneNumberResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: CustomerByPhoneNumberRequestPayloadService,
    private readonly integrationsConfigurationService: IntegrationsConfigurationService,
  ) {
    super();
  }

  async get(
    dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    try {
      this.validateInput(dto);
      return await this.getCustomer(dto);
    } catch (error) {
      this.exceptionHandler(error);
    }
  }

  private validateInput(dto: CustomerByPhoneNumberDto): void {
    if (!dto || !dto.areaCode || !dto.phoneNumber)
      throw new CustomerByPhoneNumberInvalidQueryRequestException();
  }

  private getCustomer(
    dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    return this.invoke({ NU_SERVICIO: `${dto.areaCode}${dto.phoneNumber}` });
  }

  private get customerByPhoneNumberUrl(): string {
    return this.integrationsConfigurationService.customerByPhoneNumberUrl;
  }

  private async invoke(
    bodyPayload: ICustomerByPhoneNumberRequestBody,
  ): Promise<ICustomerByPhoneNumberResponse> {
    const response =
      await this.httpService.axiosRef.post<ICustomerByPhoneNumberResponse>(
        this.customerByPhoneNumberUrl,
        this.getBodyPayload(bodyPayload),
        super.getAxiosRequestConfig('AP738ConsultaAbonadoActivoNumeroTelefono'),
      );
    super.validateResponse(
      response.data,
      'Error al consultar el cliente por número de teléfono',
    );
    return response.data;
  }

  private getBodyPayload(bodyPayload: ICustomerByPhoneNumberRequestBody): any {
    return this.requestPayloadService.get({
      functionName: 'consultaAbonadoActivoNumeroTelefono',
      body: bodyPayload,
    });
  }
}
