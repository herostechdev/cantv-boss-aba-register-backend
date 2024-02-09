import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetDSLCentralCoIdByDSLAMPortIdDto } from './get-dsl-central-coid-by-dslam-port-id-request.dto';
import { IGetDSLCentralCoIdByDSLAMPortIdResponse } from './get-dsl-central-coid-by-dslam-port-id-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteFunctionRawService } from 'src/oracle/oracle-execute-function-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../../../stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetDSLCentralCoIdByDSLAMPortIdRawService extends OracleExecuteFunctionRawService<
  GetDSLCentralCoIdByDSLAMPortIdDto,
  IGetDSLCentralCoIdByDSLAMPortIdResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      null,
      BossConstants.GET_DSL_CENTRAL_CO_ID_BY_DSLAM_PORT_ID,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetDSLCentralCoIdByDSLAMPortIdDto): any {
    // data.getPortIdFromIpResponse.dslamportId ??
    // data.getPortIdResponse.portId,
    return {
      l_dslamportid: OracleHelper.numberBindIn(dto.portId),

      result: OracleHelper.stringBindOut(),
    };
  }

  protected getResponse(result: any): IGetDSLCentralCoIdByDSLAMPortIdResponse {
    return {
      centralPortId: result?.outBinds?.result,
    };
  }
}
