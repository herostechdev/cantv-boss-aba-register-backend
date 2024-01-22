import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { UpdatePasswordFromLoginRequestDto } from './update-password-from-login-request.dto';
import { IUpdatePasswordFromLoginResponse } from './update-password-from-login-response.interface';
import { UpdatePasswordFromLoginStatusConstants } from './update-password-from-login-status.constants';

@Injectable()
export class UpdatePasswordFromLoginRawService extends OracleExecuteStoredProcedureRawService<
  UpdatePasswordFromLoginRequestDto,
  IUpdatePasswordFromLoginResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.UPDATE_PASSWORD_FROM_LOGIN,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: UpdatePasswordFromLoginRequestDto): any {
    return {
      userlogin: OracleHelper.stringBindIn(dto.username),
      userpassword: OracleHelper.stringBindIn(dto.password),

      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IUpdatePasswordFromLoginResponse {
    return {
      status: (OracleHelper.getParameterValue(result, 'o_status') ??
        UpdatePasswordFromLoginStatusConstants.ERROR) as UpdatePasswordFromLoginStatusConstants,
    };
  }
}
