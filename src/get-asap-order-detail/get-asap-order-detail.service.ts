import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetASAPOrderDetailPayloadService } from './get-asap-order-detail-payload.service';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail-request.dto';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail-response.interface';
import { SOAPRequestService } from 'src/soap/requests/soap-request.service';
import { GetASAPOrderDetailInvalidQueryRequestException } from './get-asap-order-detail-invalid-request.exception';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetASAPOrderDetailService extends SOAPRequestService<IGetASAPOrderDetailResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: GetASAPOrderDetailPayloadService,
    private readonly picConfigurationService: IntegrationsConfigurationService,
  ) {
    super();
  }

  async getASAPOrderDetail(
    dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        bindingData: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      Wlog.instance.info({
        message: 'Validar parámetros de entrada',
        bindingData: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      this.validateInput(dto);
      Wlog.instance.info({
        message: 'Obtieniendo información de la orden',
        bindingData: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      const response = await this.invoke(dto);
      Wlog.instance.info({
        message: 'Fin',
        bindingData: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        message: error?.message,
        bindingData: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      this.exceptionHandler(error);
    }
  }

  private validateInput(dto: GetASAPOrderDetailRequestDto): void {
    if (!dto || !dto.orderId)
      throw new GetASAPOrderDetailInvalidQueryRequestException();
  }

  private async invoke(
    bodyPayload: IGetASAPOrderDetailRequest,
  ): Promise<IGetASAPOrderDetailResponse> {
    const response =
      await this.httpService.axiosRef.post<IGetASAPOrderDetailResponse>(
        this.picConfigurationService.getASAPOrderDetailUrl,
        this.getBodyPayload(bodyPayload),
        super.getAxiosRequestConfig('consultarDetalleOrdenesAsap'),
      );
    super.validateResponse(
      response.data,
      'Error al consultar el detalle de la orden en ASAP',
    );
    return response.data;
  }

  private getBodyPayload(bodyPayload: IGetASAPOrderDetailRequest): any {
    return this.requestPayloadService.get({
      functionName: 'obtenerclienteCRM',
      body: bodyPayload,
    });
  }
}
