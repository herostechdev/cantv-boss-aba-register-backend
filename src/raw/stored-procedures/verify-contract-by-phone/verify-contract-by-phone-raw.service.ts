import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { IVerifyContractByPhoneResponse } from './verify-contract-by-phone-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { VerifyContractByPhoneRequestDto } from './verify-contract-by-phone-request.dto';
import { VerifyContractByPhoneStatusConstants } from './verify-contract-by-phone-status.constants';

@Injectable()
export class VerifyContractByPhoneRawService extends OracleExecuteStoredProcedureRawService<
  VerifyContractByPhoneRequestDto,
  IVerifyContractByPhoneResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.VERIFY_CONTRACT_BY_PHONE,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: VerifyContractByPhoneRequestDto): any {
    return {
      i_areacode: OracleHelper.stringBindIn(dto.areaCode),
      i_phonenumber: OracleHelper.stringBindIn(dto.phoneNumber),
    };
  }

  protected getResponse(result: any): IVerifyContractByPhoneResponse {
    return {
      status: (result?.outBinds?.o_status ??
        VerifyContractByPhoneStatusConstants.ERROR) as VerifyContractByPhoneStatusConstants,
    };
    // switch (status) {
    //   case VerifiyContractByPhoneStatusConstants.SUCCESSFULL:
    //     return response;
    //   case VerifiyContractByPhoneStatusConstants.ERROR:
    //     throw new VerifyContractByPhoneException();
    //   default:
    //     throw new VerifyContractByPhoneException();
    // }
  }
}
