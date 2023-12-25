import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossHelper } from 'src/boss-helpers/boss.helper';
import { CommonService } from 'src/system/infrastructure/services/common.service';
import { ExpiredIpException } from 'src/database-objects/stored-procedures/is-ip-allowed/expired-ip.exception';
import { IsIpAllowedException } from 'src/database-objects/stored-procedures/is-ip-allowed/is-ip-allowed.exception';
import { IIsIPAllowedResponse } from 'src/database-objects/stored-procedures/is-ip-allowed/is-ip-allowed-response.interface';
import { IsIPAllowedRawService } from 'src/database-objects/stored-procedures/is-ip-allowed/is-ip-allowed-raw.service';
import { IsIPAllowedRequestDto } from 'src/database-objects/stored-procedures/is-ip-allowed/is-ip-allowed-request.dto';
import { IsIpAllowedStatusConstants } from 'src/database-objects/stored-procedures/is-ip-allowed/is-ip-allowed-status.constants';
import { IOracleExecute } from 'src/oracle/oracle-execute.interface';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class AbaRegisterIsIPAllowedService
  extends CommonService
  implements IOracleExecute<IsIPAllowedRequestDto, IIsIPAllowedResponse>
{
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
        input: dto.ipAddress,
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'isIPAllowed',
      });
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Verifica si la IP es permisada',
        input: dto.ipAddress,
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'isIPAllowed',
      });
      const response = await this.isIPAllowedRawService.execute(
        dto,
        dbConnection,
      );
      this.processResponse(response);
      Wlog.instance.info({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        message: 'Fin',
        input: dto.ipAddress,
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'isIPAllowed',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        phoneNumber: BossHelper.getPhoneNumber(dto),
        input: dto.ipAddress,
        clazz: AbaRegisterIsIPAllowedService.name,
        method: 'isIPAllowed',
        error: error,
      });
      super.exceptionHandler(error, dto?.ipAddress);
    }
  }

  processResponse(response: IIsIPAllowedResponse): IIsIPAllowedResponse {
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
