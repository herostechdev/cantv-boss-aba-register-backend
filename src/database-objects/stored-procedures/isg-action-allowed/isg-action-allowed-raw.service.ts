import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { IISGActionAllowedResponse } from './isg-action-allowed-response.interface';
import { ISGActionAllowedRequestDto } from './isg-action-allowed-request.dto';
import { IOracleRawExecute } from 'src/oracle/oracle-raw-execute.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class ISGActionAllowedRawService
  extends OracleDatabaseService
  implements
    IOracleRawExecute<ISGActionAllowedRequestDto, IISGActionAllowedResponse>
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: ISGActionAllowedRequestDto,
    dbConnection?: Connection,
  ): Promise<IISGActionAllowedResponse> {
    try {
      await super.connect(dbConnection);
      const result = await super.executeStoredProcedure(
        BossConstants.SIGS_PACKAGE,
        BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
        this.getParameters(dto),
      );
      return this.getResponse(result);
    } catch (error) {
      super.exceptionHandler(error, dto);
    } finally {
      await super.closeConnection(dbConnection !== null);
    }
  }

  getParameters(dto: ISGActionAllowedRequestDto): any {
    return {
      groupname: OracleHelper.stringBindIn(dto.groupName),
      action: OracleHelper.stringBindIn(BossConstants.INSTALL_ABA),

      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  getResponse(result: any): IISGActionAllowedResponse {
    return {
      status: OracleHelper.getFirstItem(result, 'status'),
    };
  }
}
