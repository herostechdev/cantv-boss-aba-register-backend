import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { CheckIpRequestDto } from './check-ip-request.dto';
import { CheckIpStatusConstants } from './check-ip-status.constants';
import { ICheckIpResponse } from './check-ip-response.interface';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class CheckIpRawService extends OracleExecuteStoredProcedureRawService<
  CheckIpRequestDto,
  ICheckIpResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.BOSS_PACKAGE,
      BossConstants.CHECK_IP,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: CheckIpRequestDto): any {
    return {
      // abadslamportid: OracleHelper.stringBindIn(
      //   String(
      //     data.getPortIdFromIpResponse.dslamportId ??
      //       data.getPortIdResponse.portId,
      //   ),
      // ),
      abadslamportid: OracleHelper.stringBindIn(String(dto.dslamportId)),
      abaareacode: OracleHelper.stringBindIn(dto.areaCode),
      abaphonenumber: OracleHelper.stringBindIn(dto.phoneNumber),
      abauserlogin: OracleHelper.stringBindIn(
        dto.loginInstall ?? BossConstants.REGISTER,
      ),
      abaportwithcontract: OracleHelper.numberBindIn(BossConstants.ZERO),
      Status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): ICheckIpResponse {
    return {
      status: (OracleHelper.getParameterValue(result, 'Status') ??
        CheckIpStatusConstants.ERROR) as CheckIpStatusConstants,
    };
    // switch (response.status) {
    //   case CheckIpStatusConstants.SUCCESSFULL:
    //     return response;
    //   case CheckIpStatusConstants.ERROR:
    //     throw new CheckIpException(result);
    //   case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PHONE_NUMBER:
    //     return response;
    //   case CheckIpStatusConstants.PORT_NOT_FOUND_BY_PARAMETER:
    //     throw new Error30032Exception();
    //   case CheckIpStatusConstants.SUCCESSFULL_BY_BUSSINESS_LOGIC:
    //     return response;
    //   case CheckIpStatusConstants.THERE_IS_NOT_CONTRACT_ASSOCIATED_WITH_THE_PORT:
    //     return response;
    //   case CheckIpStatusConstants.THE_PORT_IS_RESERVED:
    //     return response;
    //   case CheckIpStatusConstants.THE_PORT_IS_OCCUPIED_BY_ANOTHER_CONTRACT:
    //     throw new Error30031Exception();
    //   default:
    //     throw new CheckIpException(result);
    // }
  }
}
