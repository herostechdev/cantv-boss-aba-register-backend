import { Injectable } from '@nestjs/common';
import { Connection } from 'oracledb';

import { GetABADataFromRequestsException } from './get-aba-data-from-requests.exception';
import { GetABADataFromRequestsStatusConstants } from './get-aba-data-from-requests-status.constants';
import { IGetABADataFromRequestsResponse } from './get-aba-data-from-requests-response.interface';
import { IPhoneNumber } from 'src/responses/phone-number.interface';
import { OracleConfigurationService } from 'src/system/configuration/oracle/oracle-configuration.service';
import { BossConstants } from 'src/boss.constants';
import { OracleDatabaseService } from 'src/system/infrastructure/services/oracle-database.service';
import { OracleHelper } from 'src/oracle/oracle.helper';

@Injectable()
export class GetABADataFromRequestsService extends OracleDatabaseService {
  constructor(
    protected readonly oracleConfigurationService: OracleConfigurationService,
  ) {
    super(oracleConfigurationService);
  }

  //   async getABADataFromRequests(
  //     data: IPhoneNumber,
  //     dbConnection?: Connection,
  //   ): Promise<IGetABADataFromRequestsResponse> {
  //     if (!dbConnection) {
  //       await super.connect();
  //     } else {
  //       super.dbConnection = dbConnection;
  //     }
  //     const parameters = {
  //       i_areacode: OracleHelper.stringBindIn(String(data.areaCode), 256),
  //       i_phonenumber: OracleHelper.stringBindIn(String(data.phoneNumber), 256),
  //       sz_Fecha1: OracleHelper.stringBindOut(10),
  //       sz_Fecha2: OracleHelper.stringBindOut(10),
  //       sz_Fecha3: OracleHelper.stringBindOut(10),
  //       sz_PlanDesired: OracleHelper.stringBindOut(32),
  //       sz_PlanDescription: OracleHelper.stringBindOut(256),
  //       sz_MedioP: OracleHelper.stringBindOut(32),
  //       abarequests_row: OracleHelper.cursorBindOut(),
  //       abaacceptedrequests_row: OracleHelper.cursorBindOut(),
  //       abarequestsregistes_row: OracleHelper.cursorBindOut(),
  //       Status: OracleHelper.numberBindOut(),
  //     };
  //     const result = await super.executeStoredProcedure(
  //       OracleConstants.ACT_PACKAGE,
  //       OracleConstants.GET_ABA_DATA_FROM_REQUESTS,
  //       parameters,
  //     );
  //     const status = (result?.outBinds?.Status ??
  //       GetABADataFromRequestsStatusConstants.EXECUTION_ERROR) as GetABADataFromRequestsStatusConstants;
  //     const response: IGetABADataFromRequestsResponse = {
  //       date1: result?.outBinds?.sz_Fecha1,
  //       date2: result?.outBinds?.sz_Fecha2,
  //       date3: result?.outBinds?.sz_Fecha3,
  //       desiredPlan: result?.outBinds?.sz_PlanDesired,
  //       descriptionPlan: result?.outBinds?.sz_PlanDescription,
  //       medioP: result?.outBinds?.sz_MedioP,
  //       abaRequestsRow: result?.outBinds?.abarequests_row,
  //       abaAcceptedRequestsRow: result?.outBinds?.abaacceptedrequests_row,
  //       abaRequestsRegistersRow: result?.outBinds?.abarequestsregistes_row,
  //       status: status,
  //     };
  //     switch (status) {
  //       case GetABADataFromRequestsStatusConstants.SUCCESSFULL:
  //         return response;
  //       case GetABADataFromRequestsStatusConstants.EXECUTION_ERROR:
  //         throw new GetABADataFromRequestsException(result);
  //       case GetABADataFromRequestsStatusConstants.THERE_IS_NO_DATA:
  //         return response;
  //       default:
  //         throw new GetABADataFromRequestsException(result);
  //     }
  //   }

  async getABADataFromRequests(
    data: IPhoneNumber,
    dbConnection?: Connection,
  ): Promise<IGetABADataFromRequestsResponse> {
    if (!dbConnection) {
      await super.connect();
    } else {
      super.dbConnection = dbConnection;
    }
    const parameters = {
      sz_AreaCode: OracleHelper.stringBindIn(String(data.areaCode)),
      sz_PhoneNumber: OracleHelper.stringBindIn(String(data.phoneNumber)),
      sz_Fecha1: OracleHelper.stringBindOut(),
      sz_Fecha2: OracleHelper.stringBindOut(),
      sz_Fecha3: OracleHelper.stringBindOut(),
      sz_PlanDesired: OracleHelper.stringBindOut(),
      sz_PlanDescription: OracleHelper.stringBindOut(),
      sz_MedioP: OracleHelper.stringBindOut(),
      l_requesterId: OracleHelper.numberBindOut(),
      sz_requesterClassName: OracleHelper.stringBindOut(),
      o_Status: OracleHelper.numberBindOut(),
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
