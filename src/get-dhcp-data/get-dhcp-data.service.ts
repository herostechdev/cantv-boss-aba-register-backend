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
      const url = `${this.integrationsConfigurationService.getDHCPDataUrl}?${dto.ipAddress}`;
      const response = await this.httpService.axiosRef.get<any>(url, {
        headers: {
          'Content-Type': HttpConstants.APPLICATION_JSON,
        },
      });
      if (!ValidationHelper.isDefined(response.data)) {
        throw new GetDHCPDataInvalidResponseException(
          JSON.stringify(response.data),
        );
      }

      const parts = String(response.data).split('|');
      if (!ValidationHelper.isArrayWithItems(parts) || parts.length < 3) {
        throw new GetDHCPDataInvalidResponseException(JSON.stringify(response));
      }
      return {
        vpi: this.getValue(parts[0]),
        vci: this.getValue(parts[1]),
        nsp: this.getValue(parts[2]),
      };
    } catch (error) {
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
