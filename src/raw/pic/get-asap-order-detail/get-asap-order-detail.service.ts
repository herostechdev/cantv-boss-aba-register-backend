import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { xml2js } from 'xml-js';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { GetASAPOrderDetailInvalidQueryRequestException } from './get-asap-order-detail-invalid-request.exception';
import { GetASAPOrderDetailPayloadService } from './get-asap-order-detail-payload.service';
import { GetASAPOrderDetailRequestDto } from './get-asap-order-detail-request.dto';
import { IGetASAPOrderDetailRequest } from './get-asap-order-detail-request.interface';
import { IGetASAPOrderDetailResponse } from './get-asap-order-detail-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { PICConstants } from 'src/boss/pic.constants';
import { SoapRequestService } from 'src/soap/requests/soap-request.service';
import { SoapTagTypesConstants } from 'src/soap/requests/soap-tag-types.constants';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';

@Injectable()
export class GetASAPOrderDetailService extends SoapRequestService<IGetASAPOrderDetailResponse> {
  constructor(
    private readonly requestPayloadService: GetASAPOrderDetailPayloadService,
    private readonly picConfigurationService: IntegrationsConfigurationService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super();
  }

  async execute(
    dto: GetASAPOrderDetailRequestDto,
  ): Promise<IGetASAPOrderDetailResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
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
        message: BossConstants.END,
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

    console.log();
    console.log('============================================================');
    console.log('GetASAPOrderDetailService.invoke');
    console.log('url', this.picConfigurationService.getASAPOrderDetailUrl);

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

    console.log();
    console.log('response');
    console.log(JSON.stringify(response.data));

    const asapOrderDetailResponse = this.getASAPOrderDetailResponse(
      response.data,
    );

    console.log();
    console.log('asapOrderDetailResponse');
    console.log(JSON.stringify(asapOrderDetailResponse));

    super.validateResponse(
      asapOrderDetailResponse,
      'Error al consultar el detalle de la orden en ASAP. No existe la orden de servicio solicitada',
      PICConstants.PIC_OK_4_ZEROS_ERROR_CODE,
    );
    console.log();
    console.log(BossConstants.END);
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
    const ctvStatus = super.getString(source, 'CTVSTATUSAS');
    return {
      CTVNUMORDAS: super.getString(source, 'CTVNUMORDAS'),
      CTVDTSOLAS: super.getString(source, 'CTVDTSOLAS'),
      CTVDTACTIVAAS: super.getString(source, 'CTVDTACTIVAAS'),
      CTVCODFACAS: super.getString(source, 'CTVCODFACAS'),
      CTVSTATUSAS: ctvStatus,
      CTVSTATUSASCODE: this.getCTVSTATUSASCODE(ctvStatus),
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

  private getCTVSTATUSASCODE(CTVSTATUSAS: string): number {
    // TODO: Validar si se debe lanzar una excepción que termine el flujo
    if (!ValidationHelper.isDefined(CTVSTATUSAS)) return 0;
    const parts = CTVSTATUSAS.trim().split(' ');
    // TODO: Validar si se debe lanzar una excepción que termine el flujo
    if (parts.length === 0) return 0;
    return this.getASAPCode(parts[0]);
  }

  private getASAPCode(crmCode: string): number {
    const map = new Map<string, number>();
    // map.set('ABOACT', 520);
    map.set('ABOACT', 530);
    map.set('COMPL', 400);
    map.set('COMRED', 399);
    map.set('DCOMEL', 35);
    map.set('DEVASI', 120);
    map.set('DEVCOM', 30);
    map.set('ELICNOL', 732);
    map.set('ELICRD', 790);
    map.set('ELIDCRE', 719);
    map.set('ELIDIR', 715);
    map.set('ELIMCO', 710);
    map.set('ELIMEC', 704);
    map.set('ELIMIC', 701);
    // map.set('ELIMIC', 799);
    map.set('ELIMIS', 702);
    map.set('ELIMIT', 703);
    map.set('ELIMOR', 713);
    map.set('ELIMOS', 700);
    map.set('ELIMPRXP', 722);
    map.set('ELIMSD', 720);
    map.set('ELIMSR', 721);
    map.set('ELINSER', 716);
    map.set('ELIREP', 717);
    map.set('ELIRXP', 714);
    map.set('ELISTFI', 730);
    map.set('ELISXOP', 731);
    map.set('ELITRA', 705);
    map.set('ENV103', 550);
    map.set('ENV15', 580);
    map.set('ENVASI', 100);
    map.set('ENVFAC', 510);
    map.set('FORASI', 115);
    map.set('NABOACT', 531);
    map.set('NRECFAC', 501);
    map.set('PACTC', 320);
    map.set('PASIGM', 110);
    map.set('PCITA', 200);
    map.set('PDIR', 109);
    map.set('PDOCUM', 10);
    map.set('PFACT', 500);
    map.set('PFNRO', 130);
    map.set('PFPYN', 150);
    map.set('PFRED', 140);
    map.set('PINSPT', 310);
    map.set('PINST', 300);
    map.set('PINVES', 20);
    map.set('PNCITA', 210);
    map.set('PPCAE', 45);
    map.set('PPCAN', 50);
    map.set('PPFCAN', 55);
    map.set('PSIM', 160);
    map.set('PSPT', 712);
    // map.set('PSPT', 718);
    // map.set('PSPT', 711);
    map.set('PXPAGO', 11);
    map.set('REASIG', 105);
    map.set('TRABOACT', 930);
    map.set('TRCOMPLE', 960);
    map.set('TRELIMIN', 970);
    map.set('TRFPHIST', 980);
    map.set('TRPACTBD', 959);
    map.set('TRPASIGN', 955);
    map.set('TRPCFECH', 956);
    map.set('TRPCINTE', 962);
    map.set('TRPCNROS', 952);
    map.set('TRPCONEN', 954);
    map.set('TRPEINFA', 963);
    map.set('TRPELIMI', 967);
    map.set('TRPENDES', 961);
    map.set('TRPENLAC', 953);
    map.set('TRPSEAUT', 951);
    map.set('TRPSECTA', 949);
    map.set('TRPSEMAN', 950);
    map.set('TRRECPAR', 968);
    map.set('TRRECTOT', 969);
    // TODO: Validar si se debe lanzar una excepción que termine el flujo
    if (!map.has(crmCode)) return 0;
    return map.get(crmCode);
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
