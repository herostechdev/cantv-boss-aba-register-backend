import { Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { GetDHCPDataException } from './get-dhcp-data.exception';
import { GetDHCPDataInvalidResponseException } from './get-dhcp-data-invalid-response.exception';
import { GetDHCPDataRequestDto } from './get-dhcp-data-request.dto';
import { HttpConstants } from 'src/system/infrastructure/http/http-constants';
import { HttpService } from '@nestjs/axios';
import { IGetDHCPDataResponse } from './get-dhcp-data-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class GetDHCPDataService extends ExceptionsService {
  constructor(
    private readonly integrationsConfigurationService: IntegrationsConfigurationService,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  public async get(dto: GetDHCPDataRequestDto): Promise<IGetDHCPDataResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        data: dto.ipAddress,
        clazz: GetDHCPDataService.name,
        method: 'get',
      });
      const url = `${this.integrationsConfigurationService.getDHCPDataUrl}?${dto.ipAddress}`;
      Wlog.instance.info({
        message: `Url ${url}`,
        data: dto.ipAddress,
        clazz: GetDHCPDataService.name,
        method: 'get',
      });
      const response = await this.httpService.axiosRef.get<any>(url, {
        headers: {
          'Content-Type': HttpConstants.APPLICATION_JSON,
        },
      });
      Wlog.instance.info({
        message: `Respuesta ${JSON.stringify(response?.data)}`,
        data: dto.ipAddress,
        clazz: GetDHCPDataService.name,
        method: 'get',
      });
      if (!ValidationHelper.isDefined(response?.data)) {
        Wlog.instance.info({
          message: 'Respuesta inválida',
          data: dto.ipAddress,
          clazz: GetDHCPDataService.name,
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
        message: 'Fin',
        data: dto.ipAddress,
        clazz: GetDHCPDataService.name,
        method: 'get',
      });
      return {
        vpi: this.getValue(parts[0]),
        vci: this.getValue(parts[1]),
        nsp: this.getValue(parts[2]),
      };
    } catch (error) {
      Wlog.instance.error({
        message: error.message,
        data: dto.ipAddress,
        clazz: GetDHCPDataService.name,
        method: 'get',
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
