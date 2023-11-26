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

  // TODO: Verificar Método GET
  // TODO: Verificar parámetro en la URL
  public async get(dto: GetDHCPDataRequestDto): Promise<IGetDHCPDataResponse> {
    try {
      const url = `${this.integrationsConfigurationService.getDHCPDataUrl}?${dto.ipAddress}`;
      const response =
        await this.httpService.axiosRef.get<IGetDHCPDataResponse>(url, {
          headers: {
            'Content-Type': HttpConstants.APPLICATION_JSON,
          },
        });
      if (!ValidationHelper.isDefined(response.data)) {
        throw new GetDHCPDataInvalidResponseException(JSON.stringify(response));
      }
      const parts = String(response.data).split('|');
      if (!ValidationHelper.isArrayWithItems(parts) || parts.length < 3) {
        throw new GetDHCPDataInvalidResponseException(JSON.stringify(response));
      }
      return {
        vpi: parts[0],
        vci: parts[1],
        nsp: parts[2],
      };
    } catch (error) {
      throw new GetDHCPDataException(error);
    }
  }
}
