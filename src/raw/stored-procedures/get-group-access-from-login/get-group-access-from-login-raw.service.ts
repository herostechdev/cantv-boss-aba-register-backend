import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { GetGroupAccessFromLoginRequestDto } from './get-group-access-from-login-request.dto';
import { GetGroupAccessFromLoginStatusConstants } from './get-group-access-from-login-status.constants';
import { IGetGroupAccessFromLoginResponse } from './get-group-access-from-login-response.interface';
import { IOracleRawExecute } from 'src/oracle/oracle-raw-execute.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class GetGroupAccessFromLoginRawService
  extends OracleDatabaseService
  implements
    IOracleRawExecute<
      GetGroupAccessFromLoginRequestDto,
      IGetGroupAccessFromLoginResponse
    >
{
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async execute(
    dto: GetGroupAccessFromLoginRequestDto,
    dbConnection?: Connection,
  ): Promise<IGetGroupAccessFromLoginResponse> {
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

  getParameters(dto: GetGroupAccessFromLoginRequestDto): any {
    return {
      userlogin: OracleHelper.stringBindIn(dto.userlogin),

      userpassword: OracleHelper.tableOfStringBindOut(),
      accessgroup: OracleHelper.tableOfStringBindOut(),
      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  getResponse(result: any): IGetGroupAccessFromLoginResponse {
    return {
      password: result?.outBinds?.userpassword,
      accessGroup: result?.outBinds?.accessgroup,
      status: (OracleHelper.getFirstItem(result, 'status') ??
        GetGroupAccessFromLoginStatusConstants.ERROR) as GetGroupAccessFromLoginStatusConstants,
    };
  }
}
