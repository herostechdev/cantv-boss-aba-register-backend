import { Injectable } from '@nestjs/common';
import { IsIPAllowedRequestDto } from './is-ip-allowed-request.dto';
import {
  IIsIPAllowedResponse,
  IIsIPAllowedRestrictedResponse,
} from './is-ip-allowed-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { IsIpAllowedStatusConstants } from './is-ip-allowed-status.constants';
import { IsIpAllowedException } from './is-ip-allowed.exception';
import { ExpiredIpException } from './expired-ip.exception';
import { Wlog } from 'src/system/infrastructure/winston-logger/winston-logger.service';

@Injectable()
export class IsIPAllowedService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async isIPAllowedFlow(
    dto: IsIPAllowedRequestDto,
  ): Promise<IIsIPAllowedRestrictedResponse> {
    try {
      Wlog.instance.info({
        message: 'Inicio',
        clazz: IsIPAllowedService.name,
        method: 'isIPAllowed',
      });
      await super.connect();
      Wlog.instance.info({
        message: 'Verifica si la IP es permisada',
        clazz: IsIPAllowedService.name,
        method: 'isIPAllowed',
      });
      const response = await this.isIPAllowed(dto);
      Wlog.instance.info({
        message: 'Fin',
        clazz: IsIPAllowedService.name,
        method: 'isIPAllowed',
      });
      return response;
    } catch (error) {
      Wlog.instance.error({
        message: 'Error',
        clazz: IsIPAllowedService.name,
        method: 'isIPAllowed',
      });
      super.exceptionHandler(error, dto?.ipAddress);
    } finally {
      await super.closeConnection();
    }
  }

  private async isIPAllowed(
    dto: IsIPAllowedRequestDto,
  ): Promise<IIsIPAllowedRestrictedResponse> {
    const parameters = {
      i_ipsource: OracleHelper.stringBindIn(dto.ipAddress),
      o_expiredate: OracleHelper.tableOfStringBindOut(1, 532),
      o_status: OracleHelper.tableOfNumberBindOut(),
    };
    const result = await super.executeStoredProcedure(
      OracleConstants.BOSS_PACKAGE,
      OracleConstants.GET_IF_REMOTE_INSTALLER_IP,
      parameters,
    );
    const fullResponse: IIsIPAllowedResponse = {
      expireDate: OracleHelper.getFirstItem(result, 'o_expiredate'),
      status: (OracleHelper.getFirstItem(result, 'o_status') ??
        IsIpAllowedStatusConstants.ERROR) as IsIpAllowedStatusConstants,
    };
    const response: IIsIPAllowedRestrictedResponse = {
      status: (OracleHelper.getFirstItem(result, 'o_status') ??
        IsIpAllowedStatusConstants.ERROR) as IsIpAllowedStatusConstants,
    };
    switch (response.status) {
      case IsIpAllowedStatusConstants.SUCCESSFULL:
        return response;
      case IsIpAllowedStatusConstants.ERROR:
        throw new IsIpAllowedException(result);
      case IsIpAllowedStatusConstants.INVALID_IP_FOR_REMOTE_REGISTRATION:
        return response;
      case IsIpAllowedStatusConstants.EXPIRED_IP:
        throw new ExpiredIpException();
      default:
        throw new IsIpAllowedException(result);
    }
  }
}
