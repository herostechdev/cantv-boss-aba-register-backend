import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetCSIdAndPlanNameFromLoginRequestDto } from './get-csid-and-plan-name-from-login-request.dto';
import { GetCSIdAndPlanNameFromLoginStatusConstants } from './get-csid-and-plan-name-from-login-status.constants';
import { IGetCSIdAndPlanNameFromLoginResponse } from './get-csid-and-plan-name-from-login-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetCSIdAndPlanNameFromLoginRawService extends OracleExecuteStoredProcedureRawService<
  GetCSIdAndPlanNameFromLoginRequestDto,
  IGetCSIdAndPlanNameFromLoginResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_CSID_AND_PLAN_NAME_FROM_LOGIN,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetCSIdAndPlanNameFromLoginRequestDto): any {
    return {
      sz_login: OracleHelper.stringBindIn(dto.login),

      l_Clientserviceid: OracleHelper.numberBindOut(),
      sz_PlanName: OracleHelper.stringBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetCSIdAndPlanNameFromLoginResponse {
    return {
      customerServiceId: result?.outBinds?.l_Clientserviceid,
      planName: result?.outBinds?.sz_PlanName,
      status: (result?.outBinds?.o_status ??
        GetCSIdAndPlanNameFromLoginStatusConstants.ERROR) as GetCSIdAndPlanNameFromLoginStatusConstants,
    };
  }
}
