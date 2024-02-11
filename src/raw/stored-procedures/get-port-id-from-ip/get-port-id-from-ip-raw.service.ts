import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { GetPortIdFromIpRequestDto } from './get-port-id-from-ip-request.dto';
import { IGetPortIdFromIpResponse } from './get-port-id-from-ip-response.interface';
import { GetPortIdFromIpStatusConstants } from './get-port-id-from-ip-status.constants';

@Injectable()
export class GetPortIdFromIpRawService extends OracleExecuteStoredProcedureRawService<
  GetPortIdFromIpRequestDto,
  IGetPortIdFromIpResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.GET_PORT_ID_FROM_IP,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: GetPortIdFromIpRequestDto): any {
    return {
      i_ipaddress: OracleHelper.stringBindIn(dto.ipAddress),
      sz_areacode: OracleHelper.stringBindIn(dto.areaCode),
      sz_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),

      o_dslamportid: OracleHelper.numberBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetPortIdFromIpResponse {
    return {
      dslamportId: OracleHelper.getParameterValue(result, 'o_dslamportid'),
      status: (OracleHelper.getParameterValue(result, 'o_status') ??
        GetPortIdFromIpStatusConstants.ERROR) as GetPortIdFromIpStatusConstants,
    };
  }
}
