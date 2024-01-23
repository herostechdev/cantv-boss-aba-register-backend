import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { IISGActionAllowedResponse } from './isg-action-allowed-response.interface';
import { ISGActionAllowedRequestDto } from './isg-action-allowed-request.dto';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class ISGActionAllowedRawService extends OracleExecuteStoredProcedureRawService<
  ISGActionAllowedRequestDto,
  IISGActionAllowedResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.SIGS_PACKAGE,
      BossConstants.ISG_ACTION_ALLOWED,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: ISGActionAllowedRequestDto): any {
    return {
      groupname: OracleHelper.stringBindIn(dto.groupName),
      action: OracleHelper.stringBindIn(BossConstants.INSTALL_ABA),

      status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IISGActionAllowedResponse {
    return {
      status: OracleHelper.getFirstItem(result, 'status'),
    };
  }
}
