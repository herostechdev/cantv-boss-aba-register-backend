import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { IsOccupiedPortRequestDto } from './Is-occupied-port-request.dto';
import { IIsOccupiedPortResponse } from './is-occupied-port-response.interface';
import { IsOccupiedPortStatusConstants } from './is-occupied-port-status.constants';

@Injectable()
export class IsOccupiedPortRawService extends OracleExecuteStoredProcedureRawService<
  IsOccupiedPortRequestDto,
  IIsOccupiedPortResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.IS_OCCUPIED_PORT,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: IsOccupiedPortRequestDto): any {
    return {
      l_portid: OracleHelper.numberBindIn(dto.portId),

      l_result: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IIsOccupiedPortResponse {
    return {
      result: result?.outBinds?.l_result ?? BossConstants.OCCUPIED_PORT,
      status: (result?.outBinds?.o_status ??
        IsOccupiedPortStatusConstants.ERROR) as IsOccupiedPortStatusConstants,
    };
  }
}
