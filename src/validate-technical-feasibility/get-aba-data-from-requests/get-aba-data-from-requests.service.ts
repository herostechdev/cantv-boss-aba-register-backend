import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';

import { GetABADataFromRequestsException } from './get-aba-data-from-requests.exception';
import { GetABADataFromRequestsStatusConstants } from './get-aba-data-from-requests-status.constants';
import { IGetABADataFromRequestsResponse } from './get-aba-data-from-requests-response.interface';
import { IPhoneNumber } from 'src/responses/phone-number.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { BossConstants } from 'src/boss-helpers/boss.constants';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class GetABADataFromRequestsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  async getABADataFromRequests(
    data: IPhoneNumber,
    dbConnection: Connection,
  ): Promise<IGetABADataFromRequestsResponse> {
    await super.connect(dbConnection);
    const parameters = {
      // sz_AreaCode: OracleHelper.stringBindIn(String(data.areaCode)),
      // sz_PhoneNumber: OracleHelper.stringBindIn(String(data.phoneNumber)),
      // sz_Fecha1: OracleHelper.stringBindOut(),
      // sz_Fecha2: OracleHelper.stringBindOut(),
      // sz_Fecha3: OracleHelper.stringBindOut(),
      // sz_PlanDesired: OracleHelper.stringBindOut(),
      // sz_PlanDescription: OracleHelper.stringBindOut(),
      // sz_MedioP: OracleHelper.stringBindOut(),
      // l_requesterId: OracleHelper.numberBindOut(),
      // sz_requesterClassName: OracleHelper.stringBindOut(),
      // o_Status: OracleHelper.numberBindOut(),
      sz_AreaCode: OracleHelper.stringBindIn(String(data.areaCode)),
      sz_PhoneNumber: OracleHelper.stringBindIn(String(data.phoneNumber)),
      sz_Fecha1: OracleHelper.stringBindOut(),
      sz_Fecha2: OracleHelper.stringBindOut(),
      sz_Fecha3: OracleHelper.stringBindOut(),
      sz_PlanDesired: OracleHelper.stringBindOut(),
      sz_PlanDescription: OracleHelper.stringBindOut(),
      sz_MedioP: OracleHelper.stringBindOut(),
      l_requesterId: OracleHelper.stringBindOut(), //  antes era número
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
    const result = await super.executeStoredProcedure(
      BossConstants.ACT_PACKAGE,
      BossConstants.GET_ABA_DATA_FROM_REQUESTS,
      parameters,
    );
    const status = (result?.outBinds?.o_Status ??
      GetABADataFromRequestsStatusConstants.EXECUTION_ERROR) as GetABADataFromRequestsStatusConstants;
    const response: IGetABADataFromRequestsResponse = {
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
      status: status,
    };
    switch (status) {
      case GetABADataFromRequestsStatusConstants.SUCCESSFULL:
        return response;
      case GetABADataFromRequestsStatusConstants.EXECUTION_ERROR:
        throw new GetABADataFromRequestsException(result);
      case GetABADataFromRequestsStatusConstants.THERE_IS_NO_DATA:
        return response;
      default:
        throw new GetABADataFromRequestsException(result);
    }
  }
}
