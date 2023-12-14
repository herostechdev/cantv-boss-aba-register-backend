import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { GetASAPOrderDetailInvalidQueryRequestException } from './get-asap-order-detail-invalid-request.exception';
import { GetASAPOrderDetailPayloadService } from './get-asap-order-detail-payload.service';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail-request.dto';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { SOAPRequestService } from 'src/soap/requests/soap-request.service';
import { SoapTagTypesConstants } from 'src/soap/requests/soap-tag-types.constants';
import { UpdateDslAbaRegistersService } from 'src/dsl-aba-registers/update-dsl-aba-registers/update-dsl-aba-registers.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetASAPOrderDetailService extends SOAPRequestService<IGetASAPOrderDetailResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: GetASAPOrderDetailPayloadService,
    private readonly picConfigurationService: IntegrationsConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersService,
  ) {
    super();
  }

  async getASAPOrderDetail(
    dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        data: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Validar parámetros de entrada',
        data: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      this.validateInput(dto);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obteniendo información de la orden',
        data: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      const response = await this.invoke(dto);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        data: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        data: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
        error: error,
      });
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      this.exceptionHandler(error);
    }
  }

  private validateInput(dto: GetASAPOrderDetailRequestDto): void {
    if (!dto || !dto.orderId)
      throw new GetASAPOrderDetailInvalidQueryRequestException();
  }

  private async invoke(
    dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    const bodyPayload: IGetASAPOrderDetailRequest = {
      orderId: dto.orderId,
    };
    Wlog.instance.info({
      phoneNumber: BossHelper.getPhoneNumber(dto),
      message: `Url ${this.picConfigurationService.getASAPOrderDetailUrl}`,
      data: JSON.stringify(dto),
      clazz: GetASAPOrderDetailService.name,
      method: 'getASAPOrderDetail',
    });
    const response =
      await this.httpService.axiosRef.post<IGetASAPOrderDetailResponse>(
        this.picConfigurationService.getASAPOrderDetailUrl,
        this.getBodyPayload(bodyPayload),
        super.getAxiosRequestConfig('VT673consultarDetalleDeOrdenesASAP'),
      );
    super.validateResponse(
      response.data,
      'Error al consultar el detalle de la orden en ASAP',
    );
    return response.data;
  }

  private getBodyPayload(bodyPayload: IGetASAPOrderDetailRequest): any {
    return this.requestPayloadService.get({
      soapTagType: SoapTagTypesConstants.EXCLUDE_SOAP_ENV,
      includeXmlnsObt: false,
      functionName: null,
      body: bodyPayload,
    });
  }
}
