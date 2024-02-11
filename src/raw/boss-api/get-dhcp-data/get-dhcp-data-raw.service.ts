import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { ExceptionsService } from 'src/system/infrastructure/services/exceptions.service';
import { GetDHCPDataException } from './get-dhcp-data.exception';
import { GetDHCPDataInvalidResponseException } from './get-dhcp-data-invalid-response.exception';
import { GetDHCPDataRequestDto } from './get-dhcp-data-request.dto';
import { HttpConstants } from 'src/system/infrastructure/http/http-constants';
import { HttpHelper } from 'src/system/infrastructure/http/http-helper';
import { HttpService } from '@nestjs/axios';
import { IGetDHCPDataResponse } from './get-dhcp-data-response.interface';
import { IntegrationsConfigurationService } from 'src/system/configuration/pic/integrations-configuration.service';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { ValidationHelper } from 'src/system/infrastructure/helpers/validation.helper';
import { WLogHelper } from 'src/system/infrastructure/winston-logger/wlog.helper';

@Injectable()
export class GetDHCPDataRawService extends ExceptionsService {
  constructor(
    private readonly integrationsConfigurationService: IntegrationsConfigurationService,
    private readonly httpService: HttpService,
    private readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super();
  }

  protected readonly wlog = new WLogHelper(
    GetDHCPDataRawService.name,
    BossConstants.EXECUTE_METHOD,
  );

  public async execute(
    dto: GetDHCPDataRequestDto,
  ): Promise<IGetDHCPDataResponse> {
    try {
      this.wlog.info(BossConstants.START);
      const url = `${this.integrationsConfigurationService.getDHCPDataUrl}?${dto.ipAddress}`;
      this.wlog.info(`Url ${url}`);
      const response = await HttpHelper.getAxiosInstance().get<any>(url, {
        headers: {
          [HttpConstants.CONTENT_TYPE]: HttpConstants.TEXT_HTML,
        },
      });
      this.wlog.info(`Respuesta ${JSON.stringify(response?.data)}`);
      if (!ValidationHelper.isDefined(response?.data)) {
        this.wlog.info('Respuesta inválida');
        throw new GetDHCPDataInvalidResponseException(
          JSON.stringify(response.data),
        );
      }
      const parts = String(response.data).split('|');
      if (!ValidationHelper.isArrayWithItems(parts) || parts.length < 3) {
        throw new GetDHCPDataInvalidResponseException(JSON.stringify(response));
      }
      this.wlog.info(BossConstants.END);
      return {
        vpi: this.getValue(parts[0]),
        vci: this.getValue(parts[1]),
        nsp: this.getValue(parts[2]),
      };
    } catch (error) {
      this.wlog.error(error);
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
