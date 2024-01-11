import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetAndRegisterQualifOfServiceDto } from './get-and-register-qualif-of-service-request.dto';
import { GetAndRegisterQualifOfServiceStatusConstants } from './get-and-register-qualif-of-service-status.constants';
import { IGetAndRegisterQualifOfServiceResponse } from './get-and-register-qualif-of-service-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetAndRegisterQualifOfServiceRawService extends OracleExecuteStoredProcedureRawService<
  GetAndRegisterQualifOfServiceDto,
  IGetAndRegisterQualifOfServiceResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      null,
      BossConstants.GET_AND_REGISTER_QUALIF_OF_SERVICE,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetAndRegisterQualifOfServiceDto): any {
    return {
      i_clientserviceid: OracleHelper.numberBindIn(null),
      i_areacode: OracleHelper.stringBindIn(dto.areaCode, 256),
      i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 256),

      o_qualifpossible: OracleHelper.stringBindOut(),
      o_modemstatus: OracleHelper.stringBindOut(),
      o_maxdownstream: OracleHelper.stringBindOut(),
      o_maxupstream: OracleHelper.stringBindOut(),
      o_status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetAndRegisterQualifOfServiceResponse {
    return {
      qualifpossible: result?.outBinds?.o_qualifpossible,
      modemstatus: result?.outBinds?.o_modemstatus,
      maxdownstream: result?.outBinds?.o_maxdownstream,
      maxupstream: result?.outBinds?.o_maxupstream,
      status: (result?.outBinds?.o_status ??
        GetAndRegisterQualifOfServiceStatusConstants.ERROR) as GetAndRegisterQualifOfServiceStatusConstants,
    };
  }
}
