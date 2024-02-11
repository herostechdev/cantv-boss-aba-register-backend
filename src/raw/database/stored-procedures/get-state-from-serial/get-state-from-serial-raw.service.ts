import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { BossHelper } from 'src/boss/boss.helper';
import { GetStateFromSerialRequestDto } from './get-state-from-serial-request.dto';
import { GetStateFromSerialStatusConstants } from './get-state-from-serial-status.constants';
import { IGetStateFromSerialResponse } from './get-state-from-serial-response.interface';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetStateFromSerialRawService extends OracleExecuteStoredProcedureRawService<
  GetStateFromSerialRequestDto,
  IGetStateFromSerialResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_STATE_FROM_SERIAL,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: GetStateFromSerialRequestDto): any {
    return {
      i_areacode: OracleHelper.numberBindIn(Number(dto.areaCode)),
      i_serial: OracleHelper.numberBindIn(
        Number(BossHelper.getSerial(dto.phoneNumber)),
      ),
      o_state: OracleHelper.tableOfStringBindOut(),
      o_status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IGetStateFromSerialResponse {
    return {
      states: OracleHelper.getItems(result, 'o_state'),
      status: (OracleHelper.getFirstItem(result, 'o_status') ??
        GetStateFromSerialStatusConstants.ERROR) as GetStateFromSerialStatusConstants,
    };
  }
}
