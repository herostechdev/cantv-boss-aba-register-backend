import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss-helpers/boss.constants';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { IsReservedLoginRequestDto } from './is-reserved-login-request.dto';
import { IIsReservedLoginResponse } from './is-reserved-login-response.interface';
import { IsReservedLoginStatusConstants } from './is-reserved-login-status.constants';

@Injectable()
export class IsReservedLoginRawService extends OracleExecuteStoredProcedureRawService<
  IsReservedLoginRequestDto,
  IIsReservedLoginResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.IS_RESERVED_LOGIN,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: IsReservedLoginRequestDto): any {
    return {
      sz_Login: OracleHelper.stringBindIn(dto.login),

      l_result: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IIsReservedLoginResponse {
    return {
      result: result?.outBinds?.l_result,
      status: (result?.outBinds?.o_status ??
        IsReservedLoginStatusConstants.ERROR) as IsReservedLoginStatusConstants,
    };
  }
}
