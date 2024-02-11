import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';

import { GetDownstreamFromPlanRequestDto } from './get-downstream-from-plan-request.dto';
import { IGetDownstreamFromPlanResponse } from './get-downstream-from-plan-response.interface';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from 'src/raw/stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { GetDownstreamFromPlanStatusConstants } from './get-downstream-from-plan-status.constants';

@Injectable()
export class GetDownstreamFromPlanRawService extends OracleExecuteStoredProcedureRawService<
  GetDownstreamFromPlanRequestDto,
  IGetDownstreamFromPlanResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      null,
      BossConstants.GET_DOWNSTREAM_FROM_PLAN,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: GetDownstreamFromPlanRequestDto): any {
    return {
      i_planname: OracleHelper.stringBindIn(dto.desiredPlan),

      o_downstream: OracleHelper.stringBindOut(32),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetDownstreamFromPlanResponse {
    return {
      downstream: result?.outBinds?.o_downstream ?? 1,
      status: (result?.outBinds?.o_status ??
        GetDownstreamFromPlanStatusConstants.ERROR) as GetDownstreamFromPlanStatusConstants,
    };
  }
}
