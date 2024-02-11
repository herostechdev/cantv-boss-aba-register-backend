import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetPortIdRequestDto } from './get-port-id-request.dto';
import { GetPortIdStatusConstants } from './get-port-id-status.constants';
import { IGetPortIdResponse } from './get-port-id-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetPortIdRawService extends OracleExecuteStoredProcedureRawService<
  GetPortIdRequestDto,
  IGetPortIdResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_PORT_ID,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: GetPortIdRequestDto): any {
    return {
      s_nspip: OracleHelper.stringBindIn(dto.nsp),
      n_vpi: OracleHelper.numberBindIn(Number(dto.vpi)),
      n_vci: OracleHelper.numberBindIn(Number(dto.vci)),

      t_portid: OracleHelper.tableOfNumberBindOut(),
      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IGetPortIdResponse {
    return {
      portId: OracleHelper.getFirstItem(result, 't_portid'),
      status: (OracleHelper.getFirstItem(result, 'status') ??
        GetPortIdStatusConstants.EXECUTION_ERROR) as GetPortIdStatusConstants,
    };
  }
}
