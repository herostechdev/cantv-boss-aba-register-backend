import { Injectable } from '@nestjs/common';
import { BossConstants } from 'src/boss/boss.constants';
import { GetAbaDataFromRequestsRequestDto } from './get-aba-data-from-requests-request.dto';
import { GetAbaDataFromRequestsStatusConstants } from './get-aba-data-from-requests-status.constants';
import { IGetAbaDataFromRequestsResponse } from './get-aba-data-from-requests-response.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { OracleExecuteStoredProcedureRawService } from 'src/oracle/oracle-execute-stored-procedure-raw.service';
import { OracleHelper } from 'src/oracle/oracle.helper';
import { UpdateDslAbaRegistersRawService } from '../update-dsl-aba-registers/update-dsl-aba-registers-raw.service';

@Injectable()
export class GetAbaDataFromRequestsRawService extends OracleExecuteStoredProcedureRawService<
  GetAbaDataFromRequestsRequestDto,
  IGetAbaDataFromRequestsResponse
> {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
    protected readonly updateDslAbaRegistersService: UpdateDslAbaRegistersRawService,
  ) {
    super(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_ABA_DATA_FROM_REQUESTS,
      oracleConfigurationService,
      updateDslAbaRegistersService,
    );
  }

  protected getParameters(dto: GetAbaDataFromRequestsRequestDto): any {
    return {
      sz_AreaCode: OracleHelper.stringBindIn(String(dto.areaCode)),
      sz_PhoneNumber: OracleHelper.stringBindIn(String(dto.phoneNumber)),

      sz_Fecha1: OracleHelper.stringBindOut(),
      sz_Fecha2: OracleHelper.stringBindOut(),
      sz_Fecha3: OracleHelper.stringBindOut(),
      sz_PlanDesired: OracleHelper.stringBindOut(),
      sz_PlanDescription: OracleHelper.stringBindOut(),
      sz_MedioP: OracleHelper.stringBindOut(),
      l_requesterId: OracleHelper.stringBindOut(),
      sz_requesterClassName: OracleHelper.stringBindOut(),
      o_firstname: OracleHelper.stringBindOut(),
      o_lastname: OracleHelper.stringBindOut(),
      o_email: OracleHelper.stringBindOut(),
      o_phonenumber: OracleHelper.stringBindOut(),
      o_address1: OracleHelper.stringBindOut(),
      o_address2: OracleHelper.stringBindOut(),
      o_city: OracleHelper.stringBindOut(),
      o_state: OracleHelper.stringBindOut(),
      o_CompanyName: OracleHelper.stringBindOut(),
      Status: OracleHelper.numberBindOut(),
    };
  }

  protected getResponse(result: any): IGetAbaDataFromRequestsResponse {
    return {
      date1: result?.outBinds?.sz_Fecha1,
      date2: result?.outBinds?.sz_Fecha2,
      date3: result?.outBinds?.sz_Fecha3,
      desiredPlan: result?.outBinds?.sz_PlanDesired,
      descriptionPlan: result?.outBinds?.sz_PlanDescription,
      medioP: result?.outBinds?.sz_MedioP,
      requesterId: result?.outBinds?.l_requesterId,
      requesterClassName: result?.outBinds?.sz_requesterClassName,
      firstname: result?.outBinds?.o_firstname,
      lastname: result?.outBinds?.o_lastname,
      email: result?.outBinds?.o_email,
      phonenumber: result?.outBinds?.o_phonenumber,
      address1: result?.outBinds?.o_address1,
      address2: result?.outBinds?.o_address2,
      city: result?.outBinds?.o_city,
      state: result?.outBinds?.o_state,
      companyName: result?.outBinds?.o_CompanyName,
      status: (result?.outBinds?.Status ??
        GetAbaDataFromRequestsStatusConstants.ERROR) as GetAbaDataFromRequestsStatusConstants,
    };
  }
}
