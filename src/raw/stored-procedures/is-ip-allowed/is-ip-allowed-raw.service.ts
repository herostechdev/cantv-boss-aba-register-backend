import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { IOracleRawExecute } from 'src/oracle/oracle-raw-execute.interface';
import { IsIPAllowedRequestDto } from './is-ip-allowed-request.dto';
import { IIsIPAllowedResponse } from './is-ip-allowed-response.interface';
import { IsIpAllowedStatusConstants } from './is-ip-allowed-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class IsIPAllowedRawService
  extends OracleDatabaseService
  implements IOracleRawExecute<IsIPAllowedRequestDto, IIsIPAllowedResponse>
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: IsIPAllowedRequestDto,
    dbConnection?: Connection,
  ): Promise<IIsIPAllowedResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        BossConstants.BOSS_PACKAGE,
        BossConstants.GET_IF_REMOTE_INSTALLER_IP,
        this.getParameters(dto),
      );
      return this.getResponse(result);
    } catch (error) {
      super.exceptionHandler(error, dto);
    } finally {
      await super.closeConnection(dbConnection !== null);
    }
  }

  getParameters(dto: IsIPAllowedRequestDto): any {
    return {
      i_ipsource: OracleHelper.stringBindIn(dto.ipAddress),

      o_expiredate: OracleHelper.tableOfStringBindOut(),
      o_status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  getResponse(result: any): IIsIPAllowedResponse {
    return {
      expireDate: OracleHelper.getFirstItem(result, 'o_expiredate'),
      status: (OracleHelper.getFirstItem(result, 'o_status') ??
        IsIpAllowedStatusConstants.ERROR) as IsIpAllowedStatusConstants,
    };
  }
}
