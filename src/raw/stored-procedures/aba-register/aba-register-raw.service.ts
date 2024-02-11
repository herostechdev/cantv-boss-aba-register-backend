import { Injectable } from '@nestjs/common';
import { AbaRegisterRequestDto } from './aba-register-request.dto';
import { AbaRegisterStatusConstants } from './aba-register-status.constants';
import { BossConstants } from 'src/boss/boss.constants';
import { IAbaRegisterResponse } from './aba-register-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { BossHelper } from 'src/boss/boss.helper';

@Injectable()
export class AbaRegisterRawService extends OracleExecuteStoredProcedureRawService<
  AbaRegisterRequestDto,
  IAbaRegisterResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.ABA_REGISTER,
      oracleConfigurationService,
    );
  }

  protected getParameters(dto: AbaRegisterRequestDto): any {
    return {
      abadslamportid: OracleHelper.stringBindIn(String(dto.dslamPortId)),
      abaclientserviceid: OracleHelper.stringBindIn(
        String(dto.customerServiceId),
      ),
      abaattrvalues: OracleHelper.stringBindIn(
        BossHelper.getKeyAbaPhoneNumber({
          areaCode: dto.areaCode,
          phoneNumber: dto.phoneNumber,
        }),
      ),

      tstatus: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IAbaRegisterResponse {
    return {
      status: (OracleHelper.getFirstItem(result, 'tstatus') ??
        AbaRegisterStatusConstants.ERROR) as AbaRegisterStatusConstants,
    };
    // switch (response.status) {
    //   case ABARegisterStatusConstants.SUCCESSFULL:
    //     return response;
    //   case ABARegisterStatusConstants.INTERNAL_ERROR:
    //     throw new ABARegisterException();
    //   case ABARegisterStatusConstants.THERE_IS_NO_DATA:
    //     throw new Error10023Exception();
    //   default:
    //     throw new ABARegisterException();
    // }
  }
}
