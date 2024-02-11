import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetValidVPIRequestDto } from './get-valid-vpi-request.dto';
import { IGetValidVPIResponse } from './get-valid-vpi-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteFunctionRawService } from 'src/oracle/oracle-execute-function-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../../stored-procedures/update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetValidVPIRawService extends OracleExecuteFunctionRawService<
  GetValidVPIRequestDto,
  IGetValidVPIResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.UTL_PACKAGE,
      BossConstants.GET_VALID_VPI,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: GetValidVPIRequestDto): any {
    return {
      i_nspip: OracleHelper.stringBindIn(dto.nspIP),
      i_invalidvpi: OracleHelper.numberBindIn(dto.invalidVPI),

      result: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetValidVPIResponse {
    return {
      validVPI: Number(result?.outBinds?.result),
    };
  }
}
