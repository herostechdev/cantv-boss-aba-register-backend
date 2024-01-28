import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { IsValidIpAddressRequestDto } from './is-valid-ip-address-request.dto';
import { IIsValidIpAddressResponse } from './is-valid-ip-address-response.interface';
import { IsValidIpAddressStatusConstants } from './is-valid-ip-address-status.constants';

@Injectable()
export class IsValidIpAddressRawService extends OracleExecuteStoredProcedureRawService<
  IsValidIpAddressRequestDto,
  IIsValidIpAddressResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.IS_VALID_IP_ADDRESS,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: IsValidIpAddressRequestDto): any {
    return {
      abaareacode: OracleHelper.stringBindIn(dto.areaCode),
      abaphonenumber: OracleHelper.stringBindIn(dto.phoneNumber),
      abaipaddress: OracleHelper.stringBindIn(dto.ipAddress),

      Status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IIsValidIpAddressResponse {
    return {
      status: (result?.outBinds?.Status ??
        IsValidIpAddressStatusConstants.ERROR_1003) as IsValidIpAddressStatusConstants,
    };
  }
}
