import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { ExpiredIpException } from 'src/raw/stored-procedures/is-ip-allowed/expired-ip.exception';
import { IsIpAllowedException } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed.exception';
import { IIsIPAllowedResponse } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-response.interface';
import { IsIPAllowedRawService } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-raw.service';
import { IsIPAllowedRequestDto } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-request.dto';
import { IsIpAllowedStatusConstants } from 'src/raw/stored-procedures/is-ip-allowed/is-ip-allowed-status.constants';
import { OracleFinalExecuteService } from 'src/oracle/oracle-final-execute.service';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterIsIPAllowedService extends OracleFinalExecuteService<
  IsIPAllowedRequestDto,
  IIsIPAllowedResponse
> {
  constructor(private readonly isIPAllowedRawService: IsIPAllowedRawService) {
    super();
  }

  async execute(
    dto: IsIPAllowedRequestDto,
    dbConnection?: Connection,
  ): Promise<IIsIPAllowedResponse> {
    try {
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Inicio',
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'execute',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Verifica si la IP es permisada',
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'execute',
      });
      const response = await this.isIPAllowedRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'execute',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: JSON.stringify(dto),
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'execute',
        error: error,
      });
      super.exceptionHandler(error, JSON.stringify(dto));
    }
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
