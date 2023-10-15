import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GetASAPOrderDetailPayloadService } from './get-asap-order-detail-payload.service';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail-request.dto';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail-response.interface';
import { SOAPRequestService } from 'src/soap/requests/soap-request.service';
import { GetASAPOrderDetailInvalidQueryRequestException } from './get-asap-order-detail-invalid-request.exception';
import { PICConfigurationService } from 'src/system/configuration/pic/pic-configuration.service';

@Injectable()
export class GetASAPOrderDetailService extends SOAPRequestService<IGetASAPOrderDetailResponse> {
  constructor(
    private readonly httpService: HttpService,
    private readonly requestPayloadService: GetASAPOrderDetailPayloadService,
    private readonly picConfigurationService: PICConfigurationService,
  ) {
    super();
  }

  async getASAPOrderDetail(
    dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    try {
      this.validateInput(dto);
      return await this.invoke(dto);
    } catch (error) {
      console.log();
      console.log('ERROR   >> getASAPOrderDetail');
      console.log(error);
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
    console.log();
    console.log('GetASAPOrderDetailService   >>   invoke');
    console.log(response.data);
    return response.data;
  }

  private getBodyPayload(bodyPayload: IGetASAPOrderDetailRequest): any {
    return this.requestPayloadService.get({
      functionName: 'obtenerclienteCRM',
      body: bodyPayload,
    });
  }
}
