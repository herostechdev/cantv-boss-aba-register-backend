import { Injectable } from '@nestjs/common';
import { AbaRegisterExecuteService } from 'src/aba-register-flow/aba-register-execute.service';
import { CheckIpException } from 'src/raw/stored-procedures/check-ip/exceptions/check-ip.exception';
import { CheckIpRawService } from 'src/raw/stored-procedures/check-ip/check-ip-raw.service';
import { CheckIpRequestDto } from 'src/raw/stored-procedures/check-ip/check-ip-request.dto';
import { CheckIpStatusConstants } from 'src/raw/stored-procedures/check-ip/check-ip-status.constants';
import { Error30031Exception } from 'src/exceptions/error-3003-1.exception';
import { Error30032Exception } from 'src/exceptions/error-3003-2.exception';
import { ICheckIpResponse } from 'src/raw/stored-procedures/check-ip/check-ip-response.interface';
import { BossConstants } from 'src/boss/boss.constants';

@Injectable()
export class AbaRegisterCheckIpService extends AbaRegisterExecuteService<
  CheckIpRequestDto,
  ICheckIpResponse
> {
  constructor(protected readonly rawService: CheckIpRawService) {
    super(
      AbaRegisterCheckIpService.name,
      'Verificando la dirección IP',
      rawService,
    );
  }

  protected processResponse(response: ICheckIpResponse): ICheckIpResponse {
    switch (response.status) {
      case CheckIpStatusConstants.SUCCESSFULL:
        return response;
      case CheckIpStatusConstants.ERROR:
        throw new CheckIpException();
      case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PHONE_NUMBER:
        return response;
      case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PARAMETER:
        throw new Error30032Exception(BossConstants.CHECK_IP);
      case CheckIpStatusConstants.SUCCESSFULL_BY_BUSSINESS_LOGIC:
        return response;
      case CheckIpStatusConstants.THERE_IS_NOT_CONTRACT_ASSOCIATED_WITH_THE_PORT:
        return response;
      case CheckIpStatusConstants.THE_PORT_IS_RESERVED:
        return response;
      case CheckIpStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
        throw new Error30031Exception(BossConstants.CHECK_IP);
      default:
        throw new CheckIpException();
    }
  }
}
