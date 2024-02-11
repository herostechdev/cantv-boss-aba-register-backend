import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { IsIPAllowedRequestDto } from './is-ip-allowed-request.dto';
import { IIsIPAllowedResponse } from './is-ip-allowed-response.interface';
import { IsIpAllowedStatusConstants } from './is-ip-allowed-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class IsIPAllowedRawService extends OracleExecuteStoredProcedureRawService<
  IsIPAllowedRequestDto,
  IIsIPAllowedResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_IF_REMOTE_INSTALLER_IP,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: IsIPAllowedRequestDto): any {
    return {
      i_ipsource: OracleHelper.stringBindIn(dto.ipAddress),

      o_expiredate: OracleHelper.tableOfStringBindOut(),
      o_status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IIsIPAllowedResponse {
    return {
      expireDate: OracleHelper.getFirstItem(result, 'o_expiredate'),
      status: (OracleHelper.getFirstItem(result, 'o_status') ??
        IsIpAllowedStatusConstants.ERROR) as IsIpAllowedStatusConstants,
    };
  }
}
