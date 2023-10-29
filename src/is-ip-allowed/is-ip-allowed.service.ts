import { Injectable } from '@nestjs/common';
import { IsIPAllowedRequestDto } from './is-ip-allowed-request.dto';
import { IIsIPAllowedResponse } from './is-ip-allowed-response.interface';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleConstants } from 'src/oracle/oracle.constants';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class IsIPAllowedService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async isIPAllowed(dto: IsIPAllowedRequestDto): Promise<IIsIPAllowedResponse> {
    try {
      await super.connect();
      const parameters = {
        i_ipsource: OracleHelper.stringBindIn(dto.ip),
        o_expiredate: OracleHelper.tableOfStringBindOut(1, 532),
        o_status: OracleHelper.tableOfNumberBindOut(),
      };
      const result = await super.executeStoredProcedure(
        OracleConstants.BOSS_PACKAGE,
        OracleConstants.GET_IF_REMOTE_INSTALLER_IP,
        parameters,
      );
      const response = {
        expireDate: OracleHelper.getFirstItem(result, 'o_expiredate'),
        status: OracleHelper.getFirstItem(result, 'o_status'),
      };
      return response;
    } catch (error) {
      super.exceptionHandler(error, dto?.ip);
    } finally {
      await this.closeConnection();
    }
  }
}
