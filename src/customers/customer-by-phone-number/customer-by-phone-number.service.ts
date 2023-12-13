import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { xml2js } from 'xml-js';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { CustomerByPhoneNumberInvalidQueryRequestException } from './customer-by-phone-number-invalid-request.exception';
import { CustomerByPhoneNumberRequestPayloadService } from './customer-by-phone-number-request-payload.service';
import { CustomerByPhoneNumberDto } from './customer-by-phone-number.dto';
import { ICustomerByPhoneNumberRequestBody } from './customer-by-phone-number-request-body.interface';
import { ICustomerByPhoneNumberResponse } from './customer-by-phone-number-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { PICConstants } from 'src/boss-helpers/pic.constants';
import { SOAPRequestService } from 'src/soap/requests/soap-request.service';
import { SoapTagTypesConstants } from 'src/soap/requests/soap-tag-types.constants';
import { UpdateDslAbaRegistersService } from 'src/dsl-aba-registers/update-dsl-aba-registers/update-dsl-aba-registers.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class CustomerByPhoneNumberService extends SOAPRequestService<ICustomerByPhoneNumberResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: CustomerByPhoneNumberRequestPayloadService,
    private readonly integrationsConfigurationService: IntegrationsConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersService,
  ) {
    super();
  }

  async get(
    dto: CustomerByPhoneNumberDto,
  ): Promise<ICustomerByPhoneNumberResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio ',
        clazz: CustomerByPhoneNumberService.name,
        method: 'get',
      });
      Wlog.instance.info({
        message: 'Validando parámetros',
        clazz: CustomerByPhoneNumberService.name,
        method: 'get',
      });
      this.validateInput(dto);
      Wlog.instance.info({
        message: 'Consultando',
        clazz: CustomerByPhoneNumberService.name,
        method: 'get',
      });
      const response = await this.getCustomer(dto);
      Wlog.instance.info({
        message: 'Fin',
        clazz: CustomerByPhoneNumberService.name,
        method: 'get',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        message: error?.message,
        clazz: CustomerByPhoneNumberService.name,
        method: 'get',
      });
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: dto.areaCode,
        phoneNumber: dto.phoneNumber,
        registerStatus: BossConstants.NOT_PROCESSED,
      });
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
    Wlog.instance.info({
      message: `Url: ${this.customerByPhoneNumberUrl}`,
      data: JSON.stringify(bodyPayload),
      clazz: CustomerByPhoneNumberService.name,
      method: 'invoke',
    });
    const response =
      await this.httpService.axiosRef.post<ICustomerByPhoneNumberResponse>(
        this.customerByPhoneNumberUrl,
        this.getBodyPayload(bodyPayload),
        super.getAxiosRequestConfig('AP738ConsultaAbonadoActivoNumeroTelefono'),
      );
    const customerResponse = this.getCustomerResponse(response.data);
    super.validateResponse(
      customerResponse,
      'Error al consultar el cliente por número de teléfono',
      PICConstants.PIC_OK_4_ZEROS_ERROR_CODE,
    );
    return customerResponse;
  }

  private getCustomerResponse(data: any): ICustomerByPhoneNumberResponse {
    const toJson = xml2js(data, {
      compact: true,
    });
    const source =
      toJson['soapenv:Envelope']['soapenv:Body'][
        'consultaAbonadoActivoNumeroTelefonoResponse'
      ]['ns1:consultaAbonadoActivoNumeroTelefonoReturn'];
    return {
      DIRECCION_COBRO: super.getString(source, 'ns1:DIRECCION_COBRO'),
      CONDICION_NUMERO_PRIVADO: super.getString(
        source,
        'ns1:CONDICION_NUMERO_PRIVADO',
      ),
      ZONA_POSTAL: super.getString(source, 'ns1:ZONA_POSTAL'),
      IDENTIFICADOR_LLAMADAS: super.getString(
        source,
        'ns1:IDENTIFICADOR_LLAMADAS',
      ),
      NOMBRE_CLIENTE: super.getString(source, 'ns1:NOMBRE_CLIENTE'),
      UNIDAD_NEGOCIOS: super.getString(source, 'ns1:UNIDAD_NEGOCIOS'),
      SERVICIO_ABA: super.getString(source, 'ns1:SERVICIO_ABA'),
      INTENET_EQUIPADO: super.getString(source, 'ns1:INTENER_EQUIPADO'),
      OPERADOR_LDI: super.getString(source, 'ns1:OPERADOR_LDI'),
      OPERADOR_LDN: super.getString(source, 'ns1:OPERADOR_LDN'),
      CEDULA_RIF: super.getString(source, 'ns1:CEDULA_RIF'),
      TIPO_LINEA: super.getString(source, 'ns1:TIPO_LINEA'),
      BLOQUEO: super.getString(source, 'ns1:BLOQUEO'),
      MODALIDAD_LINEA: super.getString(source, 'ns1:MODALIDAD_LINEA'),
      CENTRAL: super.getString(source, 'ns1:CENTRAL'),
      PLAN_TARIFARIO: super.getString(source, 'ns1:PLAN_TARIFARIO'),
      BLOQUEO_SELECTIVO: super.getString(source, 'ns1:BLOQUEO_SELECTIVO'),
      RUTA_COBRO: super.getString(source, 'ns1:RUTA_COBRO'),
      OPERADOR_LOCAL: super.getString(source, 'ns1:OPERADOR_LOCAL'),
      CUENTA_CLIENTE: super.getString(source, 'ns1:CUENTA_CLIENTE'),
      CORREO_VOZ: super.getString(source, 'ns1:CORREO_VOZ'),
      TELEAMIGO: super.getString(source, 'ns1:TELEAMIGO'),
      TARIFA: super.getString(source, 'ns1:TARIFA'),
      ERROR_CODE: super.getString(source, 'ns1:CODERROR'),
      ERROR_MESSAGE: super.getString(source, 'ns1:DESCERROR'),
    };
  }
  private getBodyPayload(bodyPayload: ICustomerByPhoneNumberRequestBody): any {
    return this.requestPayloadService.get({
      soapTagType: SoapTagTypesConstants.INCLUDE_SOAP_ENV,
      includeXmlnsObt: true,
      functionName: 'consultaAbonadoActivoNumeroTelefono',
      body: bodyPayload,
    });
  }
}
