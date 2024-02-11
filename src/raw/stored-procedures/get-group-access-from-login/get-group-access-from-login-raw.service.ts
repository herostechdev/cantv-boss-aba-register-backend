import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetGroupAccessFromLoginRequestDto } from './get-group-access-from-login-request.dto';
import { GetGroupAccessFromLoginStatusConstants } from './get-group-access-from-login-status.constants';
import { IGetGroupAccessFromLoginResponse } from './get-group-access-from-login-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetGroupAccessFromLoginRawService extends OracleExecuteStoredProcedureRawService<
  GetGroupAccessFromLoginRequestDto,
  IGetGroupAccessFromLoginResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_GROUP_ACCESS_FROM_LOGIN,
      oracleConfigurationService,
    );
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
      password: OracleHelper.getFirstItem(result, 'userpassword'),
      accessGroup: OracleHelper.getFirstItem(result, 'accessgroup'),
      status: (OracleHelper.getFirstItem(result, 'status') ??
        GetGroupAccessFromLoginStatusConstants.ERROR) as GetGroupAccessFromLoginStatusConstants,
    };
  }
}
