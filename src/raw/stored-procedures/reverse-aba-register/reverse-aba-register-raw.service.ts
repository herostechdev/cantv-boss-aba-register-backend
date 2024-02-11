import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { IReverseAbaRegisterResponse } from './reverse-aba-register-response.interface';
import { ReverseAbaRegisterException } from './reverse-aba-register.exception';
import { ReverseAbaRegisterRequestDto } from './reverse-aba-register-request.dto';
import { ReverseAbaRegisterStatusConstants } from './reverse-aba-register-status.constants';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class ReverseAbaRegisterRawService extends OracleExecuteStoredProcedureRawService<
  ReverseAbaRegisterRequestDto,
  IReverseAbaRegisterResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(null, BossConstants.REVERSE_ABA_REGISTER, oracleConfigurationService);
  }

  protected getParameters(dto: ReverseAbaRegisterRequestDto): any {
    return {
      l_clientserviceid: OracleHelper.numberBindIn(dto.customerServiceId),

      status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IReverseAbaRegisterResponse {
    const response: IReverseAbaRegisterResponse = {
      status: OracleHelper.getParameterValue(result, 'status'),
    };
    switch (response.status) {
      case ReverseAbaRegisterStatusConstants.SUCCESSFULL:
        return response;
      case ReverseAbaRegisterStatusConstants.ERROR:
        throw new ReverseAbaRegisterException();
      default:
        throw new ReverseAbaRegisterException();
    }
  }
}
