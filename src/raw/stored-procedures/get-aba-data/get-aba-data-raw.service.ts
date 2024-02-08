import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';

import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';
import { GetAbaDataRequestDto } from './get-aba-data-request.dto';
import { IGetAbaDataResponse } from './get-aba-data-response.interface';
import { GetAbaDataStatusConstants } from './get-aba-data-status.constants';

@Injectable()
export class GetAbaDataRawService extends OracleExecuteStoredProcedureRawService<
  GetAbaDataRequestDto,
  IGetAbaDataResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_ABA_DATA,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetAbaDataRequestDto): any {
    return {
      abaorderid: OracleHelper.stringBindIn(String(dto.orderId)),
      abaareacode: OracleHelper.stringBindIn(dto.areaCode),
      abaphonenumber: OracleHelper.stringBindIn(dto.phoneNumber, 16),
      abaipaddress: OracleHelper.stringBindIn(dto.ipAddress, 99),

      abadslamportid: OracleHelper.tableOfNumberBindOut(),
      abancc: OracleHelper.tableOfStringBindOut(),
      abaclienttype: OracleHelper.tableOfStringBindOut(),
      abaorderdate: OracleHelper.tableOfStringBindOut(),
      abaad: OracleHelper.tableOfStringBindOut(),
      abaparad: OracleHelper.tableOfStringBindOut(),
      abaslot: OracleHelper.tableOfNumberBindOut(),
      abaport: OracleHelper.tableOfNumberBindOut(),
      abarack: OracleHelper.tableOfNumberBindOut(),
      abaposition: OracleHelper.tableOfNumberBindOut(),
      abavci: OracleHelper.tableOfNumberBindOut(),
      abacontractid: OracleHelper.tableOfNumberBindOut(),
      Status: OracleHelper.tableOfNumberBindOut(),
    };
  }

  protected getResponse(result: any): IGetAbaDataResponse {
    return {
      abadslamportid: OracleHelper.getFirstItem(result, 'abadslamportid'),
      abancc: OracleHelper.getFirstItem(result, 'abancc'),
      abaclienttype: OracleHelper.getFirstItem(result, 'abaclienttype'),
      abaorderdate: OracleHelper.getFirstItem(result, 'abaorderdate'),
      abaad: OracleHelper.getFirstItem(result, 'abaad'),
      abaparad: OracleHelper.getFirstItem(result, 'abaparad'),
      abaslot: OracleHelper.getFirstItem(result, 'abaslot'),
      abaport: OracleHelper.getFirstItem(result, 'abaport'),
      abarack: OracleHelper.getFirstItem(result, 'abarack'),
      abaposition: OracleHelper.getFirstItem(result, 'abaposition'),
      abavci: OracleHelper.getFirstItem(result, 'abavci'),
      abacontractid: OracleHelper.getFirstItem(result, 'abacontractid'),
      status: (OracleHelper.getFirstItem(result, 'Status') ??
        GetAbaDataStatusConstants.ERROR) as GetAbaDataStatusConstants,
    };
  }
}
