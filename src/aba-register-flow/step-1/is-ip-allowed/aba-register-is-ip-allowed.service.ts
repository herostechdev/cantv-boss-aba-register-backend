import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { ExpiredIpException } from 'src/raw/database/stored-procedures/is-ip-allowed/expired-ip.exception';
import { IsIPAllowedRawService } from 'src/raw/database/stored-procedures/is-ip-allowed/is-ip-allowed-raw.service';
import { IsIPAllowedRequestDto } from 'src/raw/database/stored-procedures/is-ip-allowed/is-ip-allowed-request.dto';
import { IIsIPAllowedResponse } from 'src/raw/database/stored-procedures/is-ip-allowed/is-ip-allowed-response.interface';
import { IsIpAllowedStatusConstants } from 'src/raw/database/stored-procedures/is-ip-allowed/is-ip-allowed-status.constants';
import { IsIpAllowedException } from 'src/raw/database/stored-procedures/is-ip-allowed/is-ip-allowed.exception';

@Injectable()
export class AbaRegisterIsIPAllowedService extends AbaRegisterExecuteService<
  IsIPAllowedRequestDto,
  IIsIPAllowedResponse
> {
  constructor(protected readonly rawService: IsIPAllowedRawService) {
    super(
      AbaRegisterIsIPAllowedService.name,
      'Verifica si la IP es permisada',
      rawService,
    );
  }

  protected processResponse(
    response: IIsIPAllowedResponse,
  ): IIsIPAllowedResponse {
    switch (response.status) {
      case IsIpAllowedStatusConstants.SUCCESSFULL:
        return response;
      case IsIpAllowedStatusConstants.ERROR:
        throw new IsIpAllowedException();
      case IsIpAllowedStatusConstants.INVALID_IP_FOR_REMOTE_REGISTRATION:
        return response;
      case IsIpAllowedStatusConstants.EXPIRED_IP:
        throw new ExpiredIpException();
      default:
        throw new IsIpAllowedException();
    }
  }
}
