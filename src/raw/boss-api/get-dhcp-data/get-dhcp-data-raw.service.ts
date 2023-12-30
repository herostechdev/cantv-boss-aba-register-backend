import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { GetDHCPDataException } from './get-dhcp-data.exception';
import { GetDHCPDataInvalidResponseException } from './get-dhcp-data-invalid-response.exception';
import { GetDHCPDataRequestDto } from './get-dhcp-data-request.dto';
import { HttpConstants } from 'src/system/infrastructure/http/http-constants';
import { HttpService } from '@nestjs/axios';
import { IGetDHCPDataResponse } from './get-dhcp-data-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetDHCPDataRawService extends ExceptionsService {
  constructor(
    private readonly integrationsConfigurationService: IntegrationsConfigurationService,
    private readonly httpService: HttpService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super();
  }

  public async execute(
    dto: GetDHCPDataRequestDto,
  ): Promise<IGetDHCPDataResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.START,
        input: JSON.stringify(dto),
        clazz: GetDHCPDataRawService.name,
        method: 'get',
      });
      const url = `${this.integrationsConfigurationService.getDHCPDataUrl}?${dto.ipAddress}`;
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: `Url ${url}`,
        input: JSON.stringify(dto),
        clazz: GetDHCPDataRawService.name,
        method: 'get',
      });
      const instance: AxiosInstance = axios.create({
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
      const response = await instance.get<any>(url, {
        headers: {
          'Content-Type': HttpConstants.TEXT_HTML,
        },
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: `Respuesta ${JSON.stringify(response?.data)}`,
        input: JSON.stringify(dto),
        clazz: GetDHCPDataRawService.name,
        method: 'get',
      });
      if (!ValidationHelper.isDefined(response?.data)) {
        Wlog.instance.info({
          phoneNumber: BossHelper.getPhoneNumber(dto),
          message: 'Respuesta inválida',
          input: JSON.stringify(dto),
          clazz: GetDHCPDataRawService.name,
          method: 'get',
        });
        throw new GetDHCPDataInvalidResponseException(
          JSON.stringify(response.data),
        );
      }
      const parts = String(response.data).split('|');
      if (!ValidationHelper.isArrayWithItems(parts) || parts.length < 3) {
        throw new GetDHCPDataInvalidResponseException(JSON.stringify(response));
      }
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: BossConstants.END,
        input: JSON.stringify(dto),
        clazz: GetDHCPDataRawService.name,
        method: 'get',
      });
      return {
        vpi: this.getValue(parts[0]),
        vci: this.getValue(parts[1]),
        nsp: this.getValue(parts[2]),
      };
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: GetDHCPDataRawService.name,
        method: 'get',
        error: error,
      });
      await this.updateDslAbaRegistersService.errorUpdate({
        areaCode: String(dto.areaCode),
        phoneNumber: String(dto.phoneNumber),
        registerStatus: BossConstants.NOT_PROCESSED,
      });
      throw new GetDHCPDataException(error);
    }
  }

  private getValue(source: string): string {
    if (!ValidationHelper.isDefined(source)) {
      return null;
    }
    const parts = source.replaceAll('\n', '').split(':');
    return parts.length > 1 ? parts[1] : null;
  }
}
