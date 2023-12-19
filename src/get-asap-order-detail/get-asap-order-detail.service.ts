import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { xml2js } from 'xml-js';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { GetASAPOrderDetailInvalidQueryRequestException } from './get-asap-order-detail-invalid-request.exception';
import { GetASAPOrderDetailPayloadService } from './get-asap-order-detail-payload.service';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail-request.dto';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { PICConstants } from 'src/boss-helpers/pic.constants';
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
        input: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Validar parámetros de entrada',
        input: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      this.validateInput(dto);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Obteniendo información de la orden',
        input: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      const response = await this.invoke(dto);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: dto.orderId,
        clazz: GetASAPOrderDetailService.name,
        method: 'getASAPOrderDetail',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: dto.orderId,
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
      input: JSON.stringify(dto),
      clazz: GetASAPOrderDetailService.name,
      method: 'getASAPOrderDetail',
    });

    // console.log();
    // console.log('this.getBodyPayload(bodyPayload)');
    // console.log(this.getBodyPayload(bodyPayload));
    // console.log(JSON.stringify(this.getBodyPayload(bodyPayload)));

    // const response =
    //   await this.httpService.axiosRef.post<IGetASAPOrderDetailResponse>(
    //     this.picConfigurationService.getASAPOrderDetailUrl,
    //     this.getBodyPayload(bodyPayload),
    //     super.getAxiosRequestConfig('VT673consultarDetalleDeOrdenesASAP'),
    //   );
    const instance: AxiosInstance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    const response = await instance.post<IGetASAPOrderDetailResponse>(
      this.picConfigurationService.getASAPOrderDetailUrl,
      this.getBodyPayload(bodyPayload),
      super.getAxiosRequestConfig('VT673consultarDetalleDeOrdenesASAP'),
    );
    // console.log();
    // console.log('============================================================');
    // console.log('response');
    // console.log(JSON.stringify(response.data));

    const asapOrderDetailResponse = this.getASAPOrderDetailResponse(
      response.data,
    );

    super.validateResponse(
      asapOrderDetailResponse,
      'Error al consultar el detalle de la orden en ASAP. No existe la orden de servicio solicitada',
      PICConstants.PIC_OK_4_ZEROS_ERROR_CODE,
      // PICConstants.PIC_CTVERRCODAS_ERROR_CODE_FIELD,
      // PICConstants.PIC_CTVERRMSGAS_ERROR_MESSAGE_FIELD,
    );
    return asapOrderDetailResponse;
  }

  private getASAPOrderDetailResponse(data: any): IGetASAPOrderDetailResponse {
    const toJson = xml2js(data, {
      compact: true,
    });
    const source =
      toJson['soapenv:Envelope']['soapenv:Body'][
        'consultarDetalleOrdenesAsapResponse'
      ]['consultarDetalleOrdenesAsapReturn'];
    return {
      CTVNUMORDAS: super.getString(source, 'CTVNUMORDAS'),
      CTVDTSOLAS: super.getString(source, 'CTVDTSOLAS'),
      CTVDTACTIVAAS: super.getString(source, 'CTVDTACTIVAAS'),
      CTVCODFACAS: super.getString(source, 'CTVCODFACAS'),
      CTVSTATUSAS: super.getString(source, 'CTVSTATUSAS'),
      CTVDIRINSAS: super.getString(source, 'CTVDIRINSAS'),
      CTVCNTSRVAS: super.getString(source, 'CTVCNTSRVAS'),
      CTVSERVAS: super.getString(source, 'CTVSERVAS'),
      CTVNUMACTAS: super.getString(source, 'CTVNUMACTAS'),
      CTVNUMNUEAS: super.getString(source, 'CTVNUMNUEAS'),
      CTVCODINVAL: super.getString(source, 'CTVCODINVAL'),
      CTVMARCAAS: super.getString(source, 'CTVMARCAAS'),
      CTVNOTENTAS: super.getString(source, 'CTVNOTENTAS'),
      CTVCOLORAS: super.getString(source, 'CTVCOLORAS'),
      CTVNUMQTYAS: super.getString(source, 'CTVNUMQTYAS'),
      CTVSERIALAS: super.getString(source, 'CTVSERIALAS'),
      CTVQTYEQPAS: super.getString(source, 'CTVQTYEQPAS'),
      CTVMODELOAS: super.getString(source, 'CTVMODELOAS'),
      CTVCONTRATOAS: super.getString(source, 'CTVCONTRATOAS'),
      CTVDESCRAS: super.getString(source, 'CTVDESCRAS'),
      CTVEQPRETAS: super.getString(source, 'CTVEQPRETAS'),
      CTVEQPINTAS: super.getString(source, 'CTVEQPINTAS'),
      CTVREGDOCAS: super.getString(source, 'CTVREGDOCAS'),
      CTVOBSAS: super.getString(source, 'CTVOBSAS'),
      CTVTPPROMAS: super.getString(source, 'CTVTPPROMAS'),
      ERROR_CODE: super.getString(source, 'CTVERRCODAS'),
      ERROR_MESSAGE: super.getString(source, 'CTVERRMSGAS'),
    };
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
